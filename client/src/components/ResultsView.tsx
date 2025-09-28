'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { defaultSchema } from "hast-util-sanitize";
import Link from 'next/link';
import { Sources, RelatedQuestions } from '@/components/shared';

const mdSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), "br"],
};

function normalizeMarkdown(input: unknown): string {
  let s = typeof input === "string" ? input : "";
  s = s.trim().replace(/^"|"$/g, '').replace(/\\n/g, "\n");
  s = s.replace(/\n\n+/g, "\n\n<br/>\n\n");
  return s;
}

interface Source {
  name?: string;
  link?: string;
}
interface ResultsViewProps {
  isLoading: boolean;
  currentQuery: string;
  generatedAnswer: string;
  sources: Source[];
  onQuestionClick: (question: string) => void;
}

export const ResultsView = ({ isLoading, currentQuery, generatedAnswer, sources, onQuestionClick }: ResultsViewProps) => {

  if (isLoading) {
    return (
      <div className="space-y-10">
        <div className="border-b border-base-300 pb-4">
          <h1 className="text-2xl font-semibold uppercase">{currentQuery}</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="loading loading-dots loading-md"></span>
          <p className="text-base-content/70">Searching for answers...</p>
        </div>
        <div className="space-y-4">
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!generatedAnswer) return null;

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="border-b border-base-300 pb-4">
        <h1 className="text-2xl font-semibold uppercase">{currentQuery}</h1>
      </div>

      <div className="space-y-8">
        {sources.length > 0 && <Sources sources={sources} />}

        <div className="font-sans prose prose-lg max-w-none prose-p:leading-relaxed prose-headings:font-semibold">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[[rehypeRaw], [rehypeSanitize, mdSchema]]}
            components={{
              a: ({ href, children }) => {
                if (!href) return <span>{children}</span>;
                if (href.startsWith("/")) {
                  return <Link href={href} className="link link-primary">{children}</Link>;
                }
                return <a href={href} target="_blank" rel="noopener noreferrer" className="link link-primary">{children}</a>;
              },
            }}
          >
            {normalizeMarkdown(generatedAnswer)}
          </ReactMarkdown>
        </div>
        <RelatedQuestions onQuestionClick={onQuestionClick} />
      </div>
    </div>
  );
};
