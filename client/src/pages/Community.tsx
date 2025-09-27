'use client'
import Calendar from 'react-calendar';
import { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import './calender.css'; // custom overrides (see below)

export default function Commmunity() {

  const [value, setValue] = useState<string>("");

  useEffect(() => {
      console.log(value);
  }, [value])


  return (
    <>
        <h1 className="text-5xl font-black mb-4">Commmunity</h1>
        <Calendar
          onChange={(e) => setValue(e && toYYYYMMDD(e.toLocaleString()) || "") }
          value={value}
          className="rounded-lg text-xs react-calendar"
        />

        {
        events[value] && 
        <div className="py-4">
          <ul className="list bg-base-100 rounded-box shadow-md">
            {events[value].map((event, index) => (
                <li className="list-row" key={index}>
                  <div>
                    <div>{event.name}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">{event.where}</div>
                  </div>
                  <p className="list-col-wrap text-xs">
                    {event.time}
                  </p>
                </li>
            ))}
          </ul>
        </div>
        }

    </>
  );
};


interface MonasteryEvent { name: string; time: string; description: string; where: string; }
type MonasteryEventsMap = Record<string, MonasteryEvent[]>;

const events: MonasteryEventsMap = 
    {
  "2025-10-01": [
    {
      "name": "Full Moon Puja",
      "time": "Morning",
      "description": "Monthly observance with special prayers and rituals.",
      "where": "Rumtek Monastery"
    },
    {
      "name": "Guru Rinpoche's Thunkar Tshechu",
      "time": "All day",
      "description": "Celebration of the birth anniversary of Guru Padmasambhava.",
      "where": "Tsuk La Khang Monastery"
    }
  ],
  "2025-10-05": [
    {
      "name": "Medicine Buddha Puja",
      "time": "Morning",
      "description": "Healing prayers and blessing ceremony for health and well-being.",
      "where": "Enchey Monastery"
    },
    {
      "name": "Tara Puja",
      "time": "Evening",
      "description": "Special prayers to Green Tara for protection and compassion.",
      "where": "Pemayangtse Monastery"
    }
  ],
  "2025-10-08": [
    {
      "name": "Lhabab Duechen Preparation",
      "time": "All day",
      "description": "Preparation rituals for the upcoming Lhabab Duechen festival.",
      "where": "Tashiding Monastery"
    },
    {
      "name": "Dharma Teaching Session",
      "time": "Afternoon",
      "description": "Weekly teaching session on Buddhist philosophy and practice.",
      "where": "Dubdi Monastery"
    }
  ],
  "2025-10-12": [
    {
      "name": "Lhabab Duechen",
      "time": "All day",
      "description": "Major festival commemorating Lord Buddha's descent from the heavenly realms. Elaborate rituals and prayers.",
      "where": "Rumtek Monastery"
    },
    {
      "name": "Lhabab Duechen Celebration",
      "time": "All day", 
      "description": "Community gathering with special prayers, butter lamp offerings, and traditional ceremonies.",
      "where": "Enchey Monastery"
    },
    {
      "name": "Lhabab Duechen Festival",
      "time": "All day",
      "description": "Sacred observance with chanting, ritual dances, and community feast.",
      "where": "Pemayangtse Monastery"
    }
  ],
  "2025-10-15": [
    {
      "name": "New Moon Puja",
      "time": "Evening",
      "description": "Special prayers and meditation ceremonies during the new moon.",
      "where": "Tashiding Monastery"
    },
    {
      "name": "Protector Deity Puja",
      "time": "Morning",
      "description": "Invocation and prayers to monastery guardian deities.",
      "where": "Ralang Monastery"
    }
  ],
  "2025-10-18": [
    {
      "name": "Mahakala Puja",
      "time": "Morning",
      "description": "Powerful protective ritual dedicated to Mahakala, the protector deity.",
      "where": "Rumtek Monastery"
    },
    {
      "name": "Community Prayer Gathering",
      "time": "Evening",
      "description": "Local devotees join monks for evening prayers and teachings.",
      "where": "Sang Choeling Monastery"
    }
  ],
  "2025-10-22": [
    {
      "name": "Avalokiteshvara Puja",
      "time": "All day",
      "description": "Special ceremony dedicated to the Bodhisattva of Compassion.",
      "where": "Enchey Monastery"
    },
    {
      "name": "Monastery Anniversary Celebration",
      "time": "All day",
      "description": "Annual celebration commemorating the founding of the monastery.",
      "where": "Phensong Monastery"
    }
  ],
  "2025-10-25": [
    {
      "name": "Dakini Day Observance",
      "time": "Morning",
      "description": "Monthly observance dedicated to female Buddhist deities and wisdom holders.",
      "where": "Pemayangtse Monastery"
    },
    {
      "name": "Butter Lamp Festival",
      "time": "Evening",
      "description": "Lighting of thousands of butter lamps for merit and blessings.",
      "where": "Tashiding Monastery"
    }
  ],
  "2025-10-28": [
    {
      "name": "Pre-Chaam Dance Practice",
      "time": "All day",
      "description": "Monks practice sacred mask dances in preparation for upcoming festivals.",
      "where": "Rumtek Monastery"
    },
    {
      "name": "Guru Padmasambhava Day",
      "time": "All day",
      "description": "Monthly celebration honoring Guru Rinpoche with prayers and rituals.",
      "where": "Tsuk La Khang Monastery"
    }
  ],
  "2025-10-31": [
    {
      "name": "Full Moon Puja",
      "time": "Evening",
      "description": "Monthly full moon ceremony with special prayers and offerings.",
      "where": "Enchey Monastery"
    },
    {
      "name": "Month-End Merit Dedication",
      "time": "Morning",
      "description": "Ceremony to dedicate merits accumulated throughout the month.",
      "where": "Do-drul Chorten Monastery"
    }
  ]
}


function toYYYYMMDD(dateStr: string) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
