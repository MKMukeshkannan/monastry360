import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenAI, Part } from "@google/genai";
import { NextRequest, NextResponse } from 'next/server';
import { base_prompt, image_base_prompt } from '@/utils/prompt';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME!);
const genAI = new GoogleGenAI({});

async function fileToGenerativePart(file: File): Promise<Part> {
  const base64EncodedData = Buffer.from(await file.arrayBuffer()).toString("base64");
  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const query = formData.get('query') as string | null;
    const image = formData.get('image') as File | null;

    if (!query || !image) {
      return NextResponse.json({ error: 'Query and image are required' }, { status: 400 });
    }

    const embeddingResult = await genAI.models.embedContent({
      model: "gemini-embedding-001",
      contents: query
    });

    if (!embeddingResult.embeddings || embeddingResult.embeddings.length === 0) {
      return NextResponse.json({ error: 'Failed to generate embedding' }, { status: 500 });
    }

    const queryEmbedding = embeddingResult.embeddings[0].values;

    if (!queryEmbedding) {
      return NextResponse.json({ error: 'Failed to generate text embedding' }, { status: 500 });
    }

    const queryResponse = await pineconeIndex.query({
      topK: 4,
      vector: queryEmbedding,
      includeMetadata: true,
      filter: {
        type: { '$in': ['monastery', 'culturalEvent', 'archive'] }
      },
    });

    const context = queryResponse.matches.map(match => {
      const metadata = match.metadata as { text: string; name?: string; title?: string; link?: string };
      return `
              Source Name: ${metadata.name || metadata.title}
              Source Link: ${metadata.link || ''}
              Source Content: ${metadata.text}
            `;
    }).join('\n\n---\n\n');

    const imagePart = await fileToGenerativePart(image);

    const promptParts: Part[] = [
      { text: image_base_prompt },
      { text: "**Context Sources:**\n" },
      { text: context },
      { text: "\n\n**User's Question:**\n" },
      { text: query },
      { text: "\n\n**Image:**\n" },
      imagePart,
      { text: "\n\n**Your Expert Response:**\nPlease provide a comprehensive, well-formatted markdown response with multiple detailed paragraphs that educates and inspires the reader." }
    ];

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-pro",
      contents: [{ role: "user", parts: promptParts }],
      config: {
        maxOutputTokens: 2048
      }
    });

    const responseText = result.text;

    return NextResponse.json(
      {
        data: responseText,
        sources: queryResponse.matches.map((m) => {
          const name =
              (typeof m.metadata!.name === "string" && m.metadata!.name.trim()) ||
              (typeof m.metadata!.title === "string" && m.metadata!.title.trim()) ||
              "Untitled";
          return {
            name,
            link: m.metadata!.link,
          };
        }),
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Image RAG API Error:', error);
    return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 });
  }
}
