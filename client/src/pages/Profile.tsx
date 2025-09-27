"use client";

import { PostCard } from "@/components/Post";
import { useUserStore } from "@/utils/store";
import Image from "next/image";

interface UserProfile {
  name: string;
  email: string;
  profile_picture: string;
}

export default function ProfilePage() {
  const resetUser = useUserStore(x => x.resetUser);
  const user: UserProfile = {
    name: "John Doe",
    email: "john@example.com",
    profile_picture: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
  };

  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={user.profile_picture}
                alt={user.name}
                width={128}
                height={128}
                className="rounded-full"
              />
            </div>
          </div>
        </figure>

        <div className="card-body items-center text-center">
          <h2 className="card-title text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
          <button onClick={() => resetUser()} className="btn btn-error btn-wide text-white"> Log Out</button>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl mt-4 p-4">
         <PostCard image="https://www.esikkimtourism.in/wp-content/uploads/2019/04/topmarch.jpg" likes={128} caption="Enjoying a sunny day in Sikkim!" username="Mukesh K." place="Gangtok" />
         <PostCard image="https://www.esikkimtourism.in/wp-content/uploads/2019/04/topmarch.jpg" likes={128} caption="Enjoying a sunny day in Sikkim!" username="Mukesh K." place="Gangtok" />
         <PostCard image="https://www.esikkimtourism.in/wp-content/uploads/2019/04/topmarch.jpg" likes={128} caption="Enjoying a sunny day in Sikkim!" username="Mukesh K." place="Gangtok" />
         <PostCard image="https://www.esikkimtourism.in/wp-content/uploads/2019/04/topmarch.jpg" likes={128} caption="Enjoying a sunny day in Sikkim!" username="Mukesh K." place="Gangtok" />
         <PostCard image="https://www.esikkimtourism.in/wp-content/uploads/2019/04/topmarch.jpg" likes={128} caption="Enjoying a sunny day in Sikkim!" username="Mukesh K." place="Gangtok" />
         <PostCard image="https://www.esikkimtourism.in/wp-content/uploads/2019/04/topmarch.jpg" likes={128} caption="Enjoying a sunny day in Sikkim!" username="Mukesh K." place="Gangtok" />
         <PostCard image="https://www.esikkimtourism.in/wp-content/uploads/2019/04/topmarch.jpg" likes={128} caption="Enjoying a sunny day in Sikkim!" username="Mukesh K." place="Gangtok" />
      </div>
    </>
  );
}

