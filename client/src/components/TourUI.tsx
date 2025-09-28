'use client';

import { useRouter } from "next/navigation";

interface StepData {
  name: string;
  description: string;
}

interface TourUIProps {
  isTourActive: boolean;
  isDescriptionVisible: boolean;
  currentStepData?: StepData;
  onStartTour: () => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  onExitTour: () => void;
  onToggleDescription: () => void;
}

export function TourUI({
  isTourActive,
  isDescriptionVisible,
  currentStepData,
  onStartTour,
  onPrevStep,
  onNextStep,
  onExitTour,
  onToggleDescription,
}: TourUIProps) {
  const router = useRouter();

  return (
    <div className="absolute top-0 left-0 w-full h-full p-4 md:p-8 pointer-events-none text-white flex flex-col justify-between">
      {/* Top Right: Start/Exit and Toggle Buttons */}
      <div className="flex justify-end w-full pointer-events-auto">
        <div className="flex items-center gap-2">
          {!isTourActive ? (
              <>
            <button onClick={() => router.push("/")} className="btn btn-primary">
                Quit
            </button>
            <button onClick={onStartTour} className="btn btn-primary">
              Start Tour
            </button>
            </>
          ) : (
            <button onClick={onExitTour} className="btn btn-ghost">
              Exit Tour
            </button>
          )}
          {isTourActive && (
            <button onClick={onToggleDescription} className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Middle Left: Description Card */}
      {isTourActive && currentStepData && (
        <div className={`select-none pointer-events-auto transition-opacity duration-300 ${isDescriptionVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="card w-full max-w-md bg-base-100/70 shadow-xl backdrop-blur-md">
            <div className="card-body">
              <h2 className="card-title text-2xl">{currentStepData.name}</h2>
              <p>{currentStepData.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Center: Prev/Next Arrows */}
      {isTourActive && (
        <div className="flex justify-center w-full pointer-events-auto">
          <div className="join">
            <button onClick={onPrevStep} className="btn btn-ghost join-item">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button onClick={onNextStep} className="btn btn-ghost join-item">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
