interface PostCardProps {
  image: string;
  likes: number;
  caption: string;
  username: string;
  place: string;
}

export const PostCard: React.FC<PostCardProps> = ({ image, likes, caption, username, place }) => {
  return (
    <div className="card w-80 bg-base-100 shadow-lg rounded-lg overflow-hidden mb-2">
      <figure> <img src={image} alt="Post" className="w-full h-48 object-cover" /> </figure>

      <div className=" p-4">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-sm">{username}</div>
          <div className="text-xs text-gray-500">{place}</div>
        </div>

        <p className="text-sm text-gray-700">{caption}</p>
      </div>
    </div>
  );
};
