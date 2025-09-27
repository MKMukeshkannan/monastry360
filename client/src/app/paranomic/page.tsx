'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { TourUI } from '@/components/TourUI';

interface TourStep {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  targetCoordinates: [number, number, number];
}

const tourSteps: TourStep[] = [
  {
    "id": 6,
    "name": "Abhyagiri Vihara - The Samadhi Buddha",
    "description": "Behold the completed statue in all its serene glory. This iconic depiction of the Buddha in the Dhyana Mudra, or meditation pose, is a globally recognized masterpiece of ancient sculpture.",
    "imageUrl": "/buddha.jpg",
    "targetCoordinates": [150, 20, 0]
  },
  {
    "id": 7,
    "name": "Abhyagiri Vihara - The Face of Enlightenment",
    "description": "Let's draw our focus closer to the face. The calm, detached expression and the half-closed eyes perfectly convey a state of deep inner peace and enlightenment that inspires visitors.",
    "imageUrl": "/buddha.jpg",
    "targetCoordinates": [-150, 20, 0]
  },
  {
    "id": 1,
    "name": "Hemis Monastery - The Grand Entrance",
    "description": "Welcome to Hemis Monastery in Ladakh, a spiritual center of the Drukpa Lineage. Our tour begins with a view of the main entrance, famed for its vibrant colors and intricate woodwork.",
    "imageUrl": "/pano.jpg",
    "targetCoordinates": [-75, 5, -130]
  },
  {
    "id": 2,
    "name": "Hemis Monastery - The Ornate Rooftops",
    "description": "Now, let's look up. The monastery's rooftops are adorned with traditional golden ornaments that gleam in the Himalayan sun, symbolizing the preciousness of the Buddha's teachings.",
    "imageUrl": "/pano.jpg",
    "targetCoordinates": [-30, 60, -129]
  },
  {
    "id": 3,
    "name": "Hemis Monastery - Himalayan Vista",
    "description": "Turning our view reveals the breathtaking landscape that cradles the monastery. Hemis is nestled in a valley, creating a sense of profound isolation and peace ideal for spiritual practice.",
    "imageUrl": "/pano.jpg",
    "targetCoordinates": [75, 6, 130]
  },

  {
    "id": 4,
    "name": "Abhyagiri Vihara - A Monumental Undertaking",
    "description": "We now travel to Sri Lanka to witness the creation of a masterpiece. This view shows the immense scaffolding, a testament to the engineering and dedication required for this sacred project.",
    "imageUrl": "/abhyagiri.jpg",
    "targetCoordinates": [120, -15, -84]
  },
  {
    "id": 5,
    "name": "Abhyagiri Vihara - Shaping a Serene Visage",
    "description": "Let's focus on the artisans' work. Here you can see the initial stages of carving the Buddha's face, a process demanding immense skill to capture a look of deep meditative peace.",
    "imageUrl": "/abhyagiri.jpg",
    "targetCoordinates": [-120, 18, 105]
  },
];

const PanoViewer = dynamic(
  () => import('@/components/PanoViewer').then((mod) => mod.PanoViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white">
        Loading 360° Experience...
      </div>
    ),
  }
);

export default function Home() {
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true);

  const handleStartTour = () => {
    setCurrentStepIndex(0);
    setIsDescriptionVisible(true);
    setIsTourActive(true);
  };

  const handleNextStep = useCallback(() => {
    setIsDescriptionVisible(true);
    setCurrentStepIndex((prevIndex) => (prevIndex + 1) % tourSteps.length);
  }, []);

  const handlePrevStep = useCallback(() => {
    setIsDescriptionVisible(true);
    setCurrentStepIndex((prevIndex) => (prevIndex - 1 + tourSteps.length) % tourSteps.length);
  }, []);
  
  const handleExitTour = () => {
    setIsTourActive(false);
  };
  
  const handleToggleDescription = () => {
    setIsDescriptionVisible(prev => !prev);
  }

  const handleFreeRoamStart = useCallback(() => {
    if (isTourActive) {
      setIsDescriptionVisible(false);
    }
  }, [isTourActive]);


  const currentStepData = tourSteps[currentStepIndex];
  const defaultFreeRoamImage = "/pano.jpg"; 
  
  const imageUrl = isTourActive ? currentStepData.imageUrl : defaultFreeRoamImage;
  const targetCoordinates = isTourActive ? currentStepData.targetCoordinates : [0, 10, -100];

  return (
    <main className="h-screen w-screen relative bg-black">
      <PanoViewer 
        imageUrl={imageUrl} 
        targetCoordinates={targetCoordinates}
        onFreeRoamStart={handleFreeRoamStart} 
      />

        {/* isTourActive={isTourActive}  */}
      <TourUI
        isTourActive={isTourActive}
        isDescriptionVisible={isDescriptionVisible}
        currentStepData={isTourActive ? currentStepData : undefined}
        onStartTour={handleStartTour}
        onPrevStep={handlePrevStep}
        onNextStep={handleNextStep}
        onExitTour={handleExitTour}
        onToggleDescription={handleToggleDescription}
      />
    </main>
  );
}
