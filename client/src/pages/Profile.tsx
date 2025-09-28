"use client";

import { PostCard } from "@/components/Post";
import { useUserStore } from "@/utils/store";

const my_posts = [{
  image: "/places/dubdi_monastery/dubdi_monastery_2.webp",
  likes: 412,
  caption: "Morning prayers at the serene Dubdi Monastery 🌄",
  username: "John",
  place: "Dubdi Monastery",
},
{
  image: "/places/chenrezig_statue_skywalk_pelling/chenrezig_statue_skywalk_pelling_3.webp",
  likes: 367,
  caption: "Incredible view from the Chenrezig Skywalk 😍",
  username: "John",
  place: "Chenrezig Statue Skywalk, Pelling",
},
{
  image: "/places/singshore_bridge_pelling/singshore_bridge__pelling_2.webp",
  likes: 298,
  caption: "Crossing the breathtaking Singshore Bridge 🌉",
  username: "John",
  place: "Singshore Bridge, Pelling",
}]


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

      <div className="card bg-base-100 shadow-xl mt-4 p-4 flex flex-col items-center justify-center">
        {my_posts.map((val, ind) => <PostCard key={ind} image={val.image} likes={val.likes} caption={val.caption} username={val.username} place={val.place} />)}
      </div>
    </>
  );
}

