import { useEffect, useState } from "react";
import { TwitterIcon } from "../../icons/twitter";
import { YouTubeIcon } from "../../icons/youtubeIcon";
import { BrainIcon } from "../../icons/brainIcon";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const handleResize = () => {
    if (window.innerWidth <= 768) setIsOpen(false);
    else setIsOpen(true);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      title: "DashBoard",
      icon: (
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          id="el-ffgzqpem"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            id="el-wr1vxq8h"
          ></path>
        </svg>
      ),
      url: "#",
    },
    { title: "Twitter", icon: <TwitterIcon />, url: "#" },
    { title: "Youtube", icon: <YouTubeIcon />, url: "#" },
  ];

  const handleLogout = () => {
    alert("You have logged out!");
  };

  return (
    <div
      className={`flex h-screen bg-gray-100 fixed top-0  left-0${
        isOpen ? "w-36" : "w-16"
      } transition-all duration-300`}
    >
      <div className="flex flex-col bg-teal-950 text-white h-full fixed top-0  left-0">
        <div className="p-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 focus:outline-none"
          >
            {isOpen ? (
              "←"
            ) : (
              <svg
                x-show="!isOpen"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                id="el-l68n5zxr"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                  id="el-0panovub"
                ></path>
              </svg>
            )}
          </button>
        </div>
        <div className="mt-auto">
          <button className="flex items-center p-4 w-full ">
            <span className="mr-3 bg-white rounded-xl">
              {" "}
              <BrainIcon />
            </span>
            {isOpen && <span>Brainly</span>}
          </button>
        </div>

        <ul className="flex-1 ">
          {menuItems.map((item) => (
            <li
              key={item.title}
              className="flex items-center p-4 hover:bg-gray-700"
            >
              <span className="mr-3">
                {item.icon}
                <div className="border w-7  flex transition-all duration-300 "></div>
              </span>

              {isOpen && <span>{item.title}</span>}
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center p-4 w-full hover:bg-slate-200 text-red-500"
          >
            <span className="mr-3">📤</span>
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
