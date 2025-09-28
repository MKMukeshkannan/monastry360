import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from 'next/server';
import { base_prompt } from '@/utils/prompt';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME!);
const genAI = new GoogleGenAI({});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query: string = await body.query;

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const queryEmbedding = await genAI.models.embedContent({
      model: "gemini-embedding-001",
      contents: query
    });

    if (!queryEmbedding.embeddings || queryEmbedding.embeddings.length === 0) {
      return NextResponse.json({ error: 'Failed to generate embedding' }, { status: 500 });
    }

    const embedding = queryEmbedding.embeddings[0].values;

    if (!embedding) {
      return NextResponse.json({ error: 'Failed to generate embedding' }, { status: 500 });
    }

    const queryResponse = await pineconeIndex.query({
      topK: 5,
      vector: embedding,
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

    const prompt = `      
      ${base_prompt}
  
      **Context Sources:**
      ${context}
      
      **User's Question:**
      ${query}
      
      **Your Expert Response:**
      Please provide a comprehensive, well-formatted markdown response with multiple detailed paragraphs that educates and inspires the reader.`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        maxOutputTokens: 2048
      }
    })


    return NextResponse.json(
      {
        data: response.text,
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
    console.error('RAG API Error:', error);
    return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 });
  }
}


