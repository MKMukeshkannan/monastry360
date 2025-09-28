'use client';

import { FormEvent, RefObject } from 'react';
import Image from 'next/image';
import { GoArrowRight, GoDeviceCameraVideo, GoX } from 'react-icons/go';

interface InputFormProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  onCameraClick: () => void;
  capturedImage: string | null;
  onRemoveImage: () => void;
  isLoading: boolean;
  inputRef: RefObject<HTMLInputElement>;
}

export const InputForm = ({
  query, onQueryChange, onSubmit, onCameraClick, capturedImage, onRemoveImage, isLoading, inputRef
}: InputFormProps) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-base-100/80 backdrop-blur-sm pb-20">
      <div className="max-w-3xl mx-auto p-4">
        {capturedImage && (
          <div className="mb-2 indicator">
            <button
              onClick={onRemoveImage}
              className="indicator-item badge badge-secondary btn-circle btn-xs"
              aria-label="Remove image"
            >
              <GoX size={12} />
            </button>
            <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-primary shadow-lg">
              <Image src={capturedImage} alt="Captured preview" layout="fill" objectFit="cover" />
            </div>
          </div>
        )}
        <form onSubmit={onSubmit} className="flex items-center gap-3 w-full bg-base-200 rounded-xl shadow-lg border border-base-300/50 p-2">
          <button
            type="button"
            onClick={onCameraClick}
            className="btn btn-ghost btn-circle"
            disabled={isLoading}
            aria-label="Open camera"
          >
            <GoDeviceCameraVideo size={20} />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={capturedImage ? "Describe the image or ask..." : "Ask a follow-up..."}
            className="input input-ghost w-full focus:outline-none focus:bg-transparent text-base"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="btn btn-primary btn-circle"
            disabled={isLoading || !query.trim()}
            aria-label="Submit query"
          >
            {isLoading ? <span className="loading loading-spinner"></span> : <GoArrowRight size={20} />}
          </button>
        </form>
      </div>
    </footer>
  );
};
