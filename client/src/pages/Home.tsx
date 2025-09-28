'use client'

import { Icon3dCubeSphere, IconBell, IconChevronLeft, IconPanoramaHorizontal } from "@tabler/icons-react";
import React, { Dispatch, useState } from "react";
import { useRouter } from "next/navigation";

import monasteries_raw from "@/utils/monastries.json";
const monasteries = monasteries_raw as Place[];

import accomodation_raw from "@/utils/accomodation.json";
const accomodation = accomodation_raw as Place[];

import food_raw from "@/utils/food.json";
const food = food_raw as Place[];

import activities_raw from "@/utils/activities.json";
const activities = activities_raw as Place[];

interface PlaceContent { overview: string; history: string; architecture: string; }
interface Place { id: string; name: string; type: string; location: string; description: string; content: PlaceContent; panoromic: string[]; models: string[]; image: string[] }

type TSubPage = "home" | "monastery" | "post";


export default function Home() {
  const [subpage, setSubpage] = useState<TSubPage>("home");
  const [monastery, setMonastery] = useState<Place>();

  const router = useRouter();

  return <>
    {subpage === 'home' &&
        <>
        <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50 ">
          <div className="navbar-start">
            <div className="flex flex-col space-y-0 px-2">
                <a className="font-light text-xs">Welcome back, </a>
                <h1 className="font-bold text-xl leading-none">John</h1>
            </div>
          </div>
          <div className="navbar-end">
            <button className="btn btn-ghost btn-circle">
                <IconBell />
            </button>
          </div>
        </div>

        <h1 className="text-black text-5xl font-bold mt-18 ">Popular Places</h1>
        <HorizontalCards showMore setMonastery={setMonastery} setPage={setSubpage} items={monasteries} />

        <br />

        <h1 className="text-black text-5xl font-bold">Accomodation</h1>
        <HorizontalCards showMore={false} setMonastery={setMonastery} setPage={setSubpage} items={accomodation} />

        <h1 className="text-black text-5xl font-bold">Food</h1>
        <HorizontalCards showMore={false} setMonastery={setMonastery} setPage={setSubpage} items={food} />

        <h1 className="text-black text-5xl font-bold">Activities</h1>
        <HorizontalCards showMore={false} setMonastery={setMonastery} setPage={setSubpage} items={activities} />

        </>
    }

    {subpage === 'monastery' && monastery &&
        <>
        <nav className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50  ">
          <button onClick={() => setSubpage('home')} className='btn btn-ghost btn-square mr-2'>
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


        </>
    }



    </>
};

interface Props { setPage: Dispatch<React.SetStateAction<TSubPage>> , setMonastery :Dispatch<React.SetStateAction<Place|undefined>> , items: Place[]; showMore: boolean; }
const HorizontalCards: React.FC<Props> = ({ items, setMonastery, setPage, showMore }) => {
  return (
    <div className="overflow-x-auto py-4">
      <div className="flex space-x-4">
        {items.slice(0, 5).map((item, ind) => (
            <div className="card bg-base-100 min-w-72 shadow-sm" key={ind}>
              <figure>
                <img
                  src={item.image[0]}
                  alt={item.name} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <p>{item.description}</p>
                <div className="card-actions justify-end">
                {showMore && <button onClick={() => {
                      setPage('monastery'); 
                      setMonastery(item);
                  }} className="btn btn-primary">Learn More</button> }
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};
