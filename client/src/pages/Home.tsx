import { IconBell } from "@tabler/icons-react";
import React from "react";

interface CardItem {
  name: string;
  description: string;
  location:string,
  established: number,
  sect: string,
  image_link:string 
};

const items:CardItem[] = [
  {
    "name": "Old Rumtek Monastery",
    "location": "East Sikkim",
    "established": 1734,
    "sect": "Karma Kagyu",
    "description": "Old Rumtek Monastery, also known as Dharma Chakra Centre, is a significant Buddhist monastery near Gangtok. Established in 1734, it serves as the seat of the Gyalwang Karmapa in exile. The monastery is renowned for its traditional Tibetan architecture and serene ambiance.",
    "image_link": "https://timesofindia.indiatimes.com/thumb/msid-56621729,width-800,height-600,quality-80,overlay-times-travel/photo.jpg"
  },
  {
    "name": "Pemayangtse Monastery",
    "location": "West Sikkim",
    "established": 1705,
    "sect": "Nyingma",
    "description": "Founded in 1705 by Lama Lhatsun Chempo, Pemayangtse Monastery is one of the oldest monasteries in Sikkim. It is known for its exquisite architecture and panoramic views of the Kanchenjunga range.",
    "image_link": "https://www.gettyimages.com/detail/photo/pemayangtse-monastery-royalty-free-image/101485426"
  },
  {
    "name": "Enchey Monastery",
    "location": "East Sikkim",
    "established": 1909,
    "sect": "Nyingma",
    "description": "Established in 1909, Enchey Monastery is located in Gangtok. Belonging to the Nyingmapa School of Tibetan Buddhism, it is known for its vibrant architecture and peaceful surroundings.",
    "image_link": "https://commons.wikimedia.org/wiki/File:Enchey_monastery.jpg"
  },
  {
    "name": "Tashiding Monastery",
    "location": "West Sikkim",
    "established": 1717,
    "sect": "Nyingma",
    "description": "Tashiding Monastery, founded in 1717 by Ngadak Sempa Chenpo, is situated atop a hill between the Rathong and Rangeet rivers. It is considered one of the holiest monasteries in Sikkim.",
    "image_link": "https://www.gettyimages.com/detail/photo/tashiding-monastery-royalty-free-image/101485426"
  },
  {
    "name": "Phodong Monastery",
    "location": "North Sikkim",
    "established": 1700,
    "sect": "Karma Kagyu",
    "description": "Phodong Monastery, founded in the early 18th century, is located about 28 km from Gangtok. It is renowned for its ancient murals and tranquil atmosphere.",
    "image_link": "https://www.tripadvisor.com/Attraction_Review-g1162472-d13549090-Reviews-Phodong_Monastery-Pelling_West_Sikkim_Sikkim.html"
  },
  {
    "name": "Ralang Monastery",
    "location": "South Sikkim",
    "established": 1995,
    "sect": "Karma Kagyu",
    "description": "Ralang Monastery, established in 1995, is located near Ravangla. It is known for its vibrant festivals, particularly the Pang Lhabsol festival, and its extensive thangka collection.",
    "image_link": "https://www.alamy.com/ralang-monastery-image390645763.html"
  },
  {
    "name": "Lingdum Monastery (Ranka Monastery)",
    "location": "East Sikkim",
    "established": 1998,
    "sect": "Karma Kagyu",
    "description": "Lingdum Monastery, also known as Ranka Monastery, was established in 1998. It features traditional Tibetan architecture and offers a peaceful retreat amidst nature.",
    "image_link": "https://www.shutterstock.com/search/lingdum"
  },
  {
    "name": "Dubdi Monastery",
    "location": "West Sikkim",
    "established": 1701,
    "sect": "Nyingma",
    "description": "Dubdi Monastery, established in 1701, is located in Yuksom. It is the oldest monastery in Sikkim and offers breathtaking panoramic views.",
    "image_link": "https://en.wikipedia.org/wiki/Dubdi_Monastery"
  },
  {
    "name": "Sang Monastery",
    "location": "South Sikkim",
    "established": 1912,
    "sect": "Karma Kagyu",
    "description": "Sang Monastery, founded in 1912, is situated in South Sikkim. It is known for its serene environment and spiritual significance.",
    "image_link": "https://www.tripadvisor.com/Attraction_Review-g1234789-d3705803-Reviews-Ralang_Monastery-Ravangla_South_Sikkim_Sikkim.html"
  },
  {
    "name": "Kewzing Monastery",
    "location": "South Sikkim",
    "established": 1974,
    "sect": "Nyingma",
    "description": "Kewzing Monastery, established in 1974, is located in South Sikkim. It is known for its traditional architecture and peaceful surroundings.",
    "image_link": "https://www.alamy.com/stock-photo/ralang-monastery.html"
  }
]



export default function Home() {
    return <>

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
        <HorizontalCards items={items} />

        <br />

        <h1 className="text-black text-5xl font-bold">Accomodation</h1>
        <HorizontalCards items={items} />
    </>
};

interface Props { items: CardItem[]; }
const HorizontalCards: React.FC<Props> = ({ items }) => {
  return (
    <div className="overflow-x-auto py-4">
      <div className="flex space-x-4">
        {items.map((item, ind) => (
            <div className="card bg-base-100 min-w-72 shadow-sm" key={ind}>
              <figure>
                <img
                  src={item.image_link}
                  alt={item.name} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <p>{item.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Learn More</button>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};
