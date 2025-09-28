'use client'
import { Icon3dCubeSphere, IconChevronLeft, IconPanoramaHorizontal } from '@tabler/icons-react'
import { use, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation';

interface PlaceContent { overview: string; history: string; architecture: string; }
interface Place { id: string; name: string; type: string; location: string; description: string; content: PlaceContent; panoromic: string[]; models: string[]; image: string[] }
import monasteries_raw from "@/utils/monastries.json";
const monasteries = monasteries_raw as Place[];
 
export default function BlogPostPage({ params, }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [monastery, setMonastery] = useState<Place>();

  useEffect(() => {
      const foundItem = monasteries.find(item => item.id === slug);
      setMonastery(foundItem);
  }, [monastery])

  const router = useRouter();
  if (!monastery) return <h1>NOT FOUND</h1>
 
  return (
    <div className="min-h-screen flex flex-col">
        <nav className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50  ">
          <button onClick={() => router.push('/')} className='btn btn-ghost btn-square mr-2'>
            <IconChevronLeft size={36} />
          </button>
          <h1 className="text-5xl font-bold">Monastery</h1>
        </nav>

        <div className="p-2 max-w-5xl mx-auto mt-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="md:w-1/2">
              <img
                src={monastery.image[0]}
                alt={monastery.name}
                className="rounded-lg w-full object-cover shadow-lg"
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-2">{monastery.name}</h1>
              <p className="text-gray-500 mb-2">{monastery.type} • {monastery.location}</p>
              <p className="mb-4">{monastery.description}</p>
            </div>
          </div>

          <div className="py-4 space-x-1 flex">
            { monastery.panoromic.length !== 0 && <button onClick={() => router.push('/paranomic')} className="btn btn-primary flex-1"> <IconPanoramaHorizontal />Panoromic</button> }
            { monastery.models.length !== 0 && <button onClick={() => router.push('/modelview')} className="btn btn-primary flex-1"><Icon3dCubeSphere />3D Model</button> }
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {monastery.image.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${monastery.name}-${i}`}
                className="rounded-lg w-full object-cover"
              />
            ))}
          </div>

          {/* Content Sections */}
          <div className="space-y-6">
            <div className="p-6 bg-base-200 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">Overview</h2>
              <p>{monastery.content.overview}</p>
            </div>
            <div className="p-6 bg-base-200 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">History</h2>
              <p>{monastery.content.history}</p>
            </div>
            <div className="p-6 bg-base-200 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">Architecture</h2>
              <p>{monastery.content.architecture}</p>
            </div>
          </div>
        </div>
      </div>
  )
}
