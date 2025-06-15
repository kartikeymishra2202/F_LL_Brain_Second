import { useEffect } from "react";
import { TwitterIcon } from "../../icons/twitter";
import { YouTubeIcon } from "../../icons/youtubeIcon";
import { BrainIcon } from "../../icons/brainIcon";
import { LogOut, Home, Menu, ChevronLeft } from "lucide-react";
import { useSidebar } from "../../hooks/sidebarContent";

export function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) toggleSidebar();
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggleSidebar]);

  const menuItems = [
    { title: "Dashboard", icon: <Home className="w-5 h-5" />, url: "#" },
    { title: "Twitter", icon: <TwitterIcon />, url: "#" },
    { title: "YouTube", icon: <YouTubeIcon />, url: "#" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white shadow-sm z-50 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <span className="bg-purple-100 p-2 rounded-xl">
            <BrainIcon />
          </span>
          {isOpen && (
            <span className="font-bold text-purple-700 text-lg">Brainly</span>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700"
        >
          {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <ul className="mt-4 space-y-1">
        {menuItems.map((item) => (
          <li key={item.title}>
            <a
              href={item.url}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              {item.icon}
              {isOpen && (
                <span className="text-sm font-medium">{item.title}</span>
              )}
            </a>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-4 w-full">
        <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 w-full">
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
