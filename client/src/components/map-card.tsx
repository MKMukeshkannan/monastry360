"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";

type SikkimSpot = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: 'monastery' | 'place';
  location: string;
  image?: string[];
};

interface MapCardProps {
  spots: SikkimSpot[];
}

export function SikkimMapCard({ spots }: MapCardProps) {
  const Map = useMemo(() => dynamic(
    () => import('@/components/sikkim-interactive-map').then((mod) => mod.SikkimInteractiveMap),
    {
      loading: () => <p className="text-center">A map is loading...</p>,
      ssr: false
    }
  ), []);

  return (
    <div className="relative h-screen w-full overflow-y-clip">
      <Map spots={spots} />
    </div>
  );
}
