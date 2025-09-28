"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L from "leaflet";
import Image from "next/image";

import sikkimBoundaryData from "@/utils/sikkim-boundary.json";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

type SikkimSpot = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: 'monastery' | 'place';
  location: string;
  image?: string[];
};

type Position = [number, number];
type Ring = Position[];
type PolygonCoordinates = Ring[];
type MultiPolygonCoordinates = PolygonCoordinates[];
type Geometry = {
  type: "MultiPolygon";
  coordinates: MultiPolygonCoordinates;
};
type FeatureProperties = {
  name: string;
};
type Feature = {
  type: "Feature";
  properties: FeatureProperties;
  geometry: Geometry;
};
type Crs = {
  type: "name";
  properties: {
    name: string;
  };
};

export type GeoJsonData = {
  type: "FeatureCollection";
  name: string;
  crs: Crs;
  features: Feature[];
};

interface InteractiveMapProps {
  spots: SikkimSpot[];
}

const customMarkerIcon = new L.Icon({
  iconUrl: '/marker.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export function SikkimInteractiveMap({ spots }: InteractiveMapProps) {
  const center: [number, number] = [27.3730, 88.44];
  const zoomLevel = 9;

  const boundaryStyle = {
    color: "#0000ff",
    weight: 2,
    opacity: 0.7,
    fillColor: "#00ffff",
    fillOpacity: 0.05
  };

  const validSpots = spots.filter(spot =>
    typeof spot.latitude === 'number' && typeof spot.longitude === 'number'
  );

  return (
    <MapContainer
      center={center}
      zoom={zoomLevel}
      scrollWheelZoom={true}
      className="h-full w-full rounded-lg z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <GeoJSON
        data={sikkimBoundaryData as GeoJsonData}
        style={boundaryStyle}
      />

      {validSpots.map((spot) => (
        <Marker
          key={spot.id}
          position={[spot.latitude, spot.longitude]}
          icon={customMarkerIcon}
        >
          <Popup
            closeButton={false}
            className="custom-popup "
          >
            <div className="card w-56 bg-base-100 shadow-2xl rounded-lg overflow-hidden border border-gray-300 ">
              {spot.image?.[0] && (
                <figure>
                  <Image
                    src={spot.image[0]}
                    alt={spot.name}
                    width={224}
                    height={120}
                    className="w-full h-28 object-cover"
                  />
                </figure>
              )}
              <div className="card-body p-4">
                <h3 className="card-title text-base font-bold leading-tight line-clamp-2">{spot.name}</h3>
                <p className="text-xs text-base-content/70">{spot.location}</p>
                <div className="card-actions justify-between items-center">
                  <div className="badge badge-primary badge-outline capitalize">{spot.type}</div>
                  <Link
                    href={`/place/${spot.id}`}
                    className="link link-primary link-hover text-sm inline-flex items-center gap-1 font-semibold"
                  >
                    Details
                    <HiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
