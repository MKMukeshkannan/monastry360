'use client';

import { useState, FormEvent, useRef } from 'react';
import { CameraModal } from '@/components/CameraModal';
import { InputForm } from '@/components/InputForm';
import { ResultsView } from '@/components/ResultsView';
import { WelcomeScreen } from '@/components/shared';
import { Montserrat } from 'next/font/google';

const monts = Montserrat({
  variable: "--font-monts",
  subsets: ["latin"],
});

function dataURLtoBlob(dataurl: string): Blob | null {
  try {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) return null;
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch (error) {
    console.error("Error converting data URL to Blob:", error);
    return null;
  }
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedAnswer, setGeneratedAnswer] = useState<string>('');
  const [sources, setSources] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const performSearch = async (searchQuery: string, image: string | null) => {
    if (!searchQuery.trim() || isLoading) return;

    setQuery('');
    setHasSearched(true);
    setIsLoading(true);
    setCurrentQuery(searchQuery);
    setGeneratedAnswer('');
    setSources([]);

    try {
      let response: Response;

      if (image) {
        const imageBlob = dataURLtoBlob(image);
        if (!imageBlob) throw new Error("Failed to process image.");

        const formData = new FormData();
        formData.append('query', searchQuery);
        formData.append('image', imageBlob, 'capture.jpg');

        response = await fetch('/api/image-search', { 
          method: 'POST',
          body: formData,
        });

      } else {
        response = await fetch('/api/search', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: searchQuery }),
        });
      }

      if (!response.ok) throw new Error(response.statusText);

      const data = await response.json();
      setGeneratedAnswer(data.data ?? "");

      const uniqueSources = (data.sources || []).filter((source: any, index: number, self: any[]) =>
        source.link && index === self.findIndex((s: any) => s.link === source.link)
      );
      setSources(uniqueSources);

    } catch (error) {
      console.error("Failed to fetch search results:", error);
      setGeneratedAnswer("Sorry, an error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setCapturedImage(null);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    performSearch(query, capturedImage);
  };

  const handleQuestionClick = (question: string) => {
    setQuery(question);
    if (capturedImage) setCapturedImage(null);
    performSearch(question, null);
  };

  const handleImageCapture = (imageSrc: string) => {
    setCapturedImage(imageSrc);
    setIsCameraOpen(false);
    inputRef.current?.focus();
  };



  return (
    <div className={`h-screen bg-base-100 font-body flex flex-col ${monts.className}`}>
      <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-40">
        <div className="max-w-3xl mx-auto">
          {!hasSearched ? (
            <WelcomeScreen />
          ) : (
            <ResultsView
              isLoading={isLoading}
              currentQuery={currentQuery}
              generatedAnswer={generatedAnswer}
              sources={sources}
              onQuestionClick={handleQuestionClick}
            />
          )}
        </div>
      </main>

      <InputForm
        query={query}
        onQueryChange={setQuery}
        onSubmit={handleFormSubmit}
        onCameraClick={() => setIsCameraOpen(true)}
        capturedImage={capturedImage}
        onRemoveImage={() => setCapturedImage(null)}
        isLoading={isLoading}
        inputRef={inputRef}
      />

      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleImageCapture}
      />
    </div>
  );
}
