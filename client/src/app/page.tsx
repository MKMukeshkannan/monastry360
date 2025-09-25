'use client'
import { IconHome, IconSearch, IconUserCircle } from "@tabler/icons-react";
import { useState } from "react";

const navItems = [
  { label: "Home", icon: <IconHome /> },
  { label: "Search", icon: <IconSearch />},
  { label: "Profile", icon: <IconUserCircle /> },
];

export default function MobileUI() {
  const [active, setActive] = useState(0);

  const renderContent = () => {
    switch (active) {
      case 0:
        return <div className="p-4">Welcome to Home Page</div>;
      case 1:
        return <div className="p-4">Search Page Content</div>;
      case 2:
        return <div className="p-4">Profile Page Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-1">{renderContent()}</main>

      <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md">
        <div className="flex justify-around p-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`flex flex-col items-center text-sm ${
                active === index ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

