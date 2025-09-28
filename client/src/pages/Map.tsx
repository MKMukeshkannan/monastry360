import { SikkimMapCard } from '@/components/map-card';
import sikkimData from '@/utils/monastries.json';

type SikkimSpot = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: 'monastery' | 'place';
  location: string;
  image?: string[];
};

export default function Map() {
  const spots = sikkimData as SikkimSpot[];
  return (
      <SikkimMapCard spots={spots} />
  )
}
