'use client'
import { IconHome, IconMapPin, IconSearch, IconUserCircle, IconUsersGroup } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from '@/utils/store'

import Home from "@/pages/Home";
import Commmunity from "@/pages/Community";
import Profile from "@/pages/Profile";

const navItems = [
  { label: "Community",  icon: <IconUsersGroup size={24} />},
  { label: "Map",        icon: <IconMapPin size={24} />},
  { label: "Home",       icon: <IconHome size={24} /> },
  { label: "Search",     icon: <IconSearch size={24} />},
  { label: "Profile",    icon: <IconUserCircle size={24} /> },
];

export default function MobileUI() {
  const [active, setActive] = useState(2);
  const router = useRouter();
  const profile = useUserStore((state) => state.profile);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && profile === null) {
      router.replace("/login");
    }
  }, [hydrated, profile, router]);

  if (!hydrated) return <div>Loading...</div>;
  if (profile === null) return null;


  const pageContent = () => {
    switch (active) {
      case 0:
        return <Commmunity />;
      case 1:
        return <Map />;
      case 2:
        return <Home />;
      case 3:
        return <Search />;
      case 4:
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
        <main className="w-full h-0 flex-1 overflow-y-auto p-2 pb-20">
            {pageContent()}
        </main>
        <nav className="fixed bottom-0 h-20 w-full shadow shadow-black rounded-t-2xl flex items-center justify-between px-5 bg-white ">
            {
                navItems.map((v, ind) => 
                    <div onClick={() => setActive(ind)} className={`${active === ind ? "text-black" : "text-gray-500" } rounded-full w-full py-5  flex flex-col items-center justify-center`} key={ind}>
                      {v.icon}
                      <h1 className="text-xs">{v.label}</h1>
                      <div className={`${active !== ind && "hidden"} bg-black w-5 h-1 mt-2 rounded-2xl transition-all`}></div>
                    </div>)
            }
        </nav>
    </div>
  );
}


const Map = () => {
    return <><h1 className="text-black">map</h1></>
};


const Search = () => {
    return <><h1 className="text-black">search</h1></>
};
