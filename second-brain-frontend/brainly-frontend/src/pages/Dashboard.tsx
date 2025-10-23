import { useEffect, useState } from "react";
import { Search, Plus, Share2, Filter, Youtube } from "lucide-react";

import { ContentModal } from "../components/CreateContentModal";
import { Sidebar } from "../components/ui/Sidebar";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/Button";
import { useContent } from "../hooks/useContent";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../hooks/sidebarContent";
interface ContentItem {
  contentId: string;
  title: string;
  link: string;
  type: "youtube" | "twitter" | "instagram" | "YouTube" | "Twitter";
}

function Dashboard() {
  const navigate = useNavigate();
  const { isOpen } = useSidebar();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  const [modalopen, setModalOpen] = useState(false);
  const { content, refresh } = useContent();

  useEffect(() => {}, [modalopen]);

  const categoryStats = [
    {
      name: "YouTube",
      count: 1,
      color: "bg-red-100 text-red-600",
      icon: <Youtube className="w-5 h-5" />,
    },
    {
      name: "Tweets",
      count: 4,
      color: "bg-blue-100 text-blue-600",
      icon: <div className="w-5 h-5 bg-blue-500 rounded-full"></div>,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar stays fixed */}
      <Sidebar />

      {/* Content shifts based on sidebar width */}
      <div
        className={`transition-all duration-300 ${isOpen ? "pl-64" : "pl-20"}`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                My Digital Brain
              </h1>
              <p className="text-gray-600">
                Your centralized hub for all important links and resources
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <Button
                onClick={() => setModalOpen(true)}
                varient="primary"
                size="sm"
                text="Add New Link"
                startIcon={<Plus className="w-4 h-4" />}
              />
              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Overview Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
              <span className="text-sm text-gray-500">View All</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categoryStats.map((category) => (
                <div
                  key={category.name}
                  className="bg-white border border-gray-200 rounded-lg p-4 text-center"
                >
                  <div
                    className={`w-12 h-12 ${
                      category.color.split(" ")[0]
                    } rounded-lg flex items-center justify-center mx-auto mb-3`}
                  >
                    {category.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {category.count}
                  </div>
                  <div className="text-sm text-gray-600">{category.name}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Recently Added */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Recently Added
              </h2>
              <span className="text-sm text-gray-500">View All</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg divide-y">
              {(content as ContentItem[]).slice(0, 3).map((item) => (
                <div
                  key={item.contentId}
                  className="p-4 flex items-center gap-4"
                >
                  <div className="flex-shrink-0">
                    {item.type === "YouTube" && (
                      <Youtube className="w-5 h-5 text-red-600" />
                    )}
                    {item.type === "Twitter" && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {item.link}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{item.type}</span>
                    <span>2 hours ago</span>
                    <span className="text-blue-600">View 338</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Browse by Category */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Browse by Category
              </h2>
              <span className="text-sm text-blue-600">Manage collections</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categoryStats.map((category) => (
                <div
                  key={category.name}
                  className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 ${
                      category.color.split(" ")[0]
                    } rounded-lg flex items-center justify-center mx-auto mb-3`}
                  >
                    {category.icon}
                  </div>
                  <div className="font-medium text-gray-900 mb-1">
                    {category.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {category.count} items
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* All Content */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                All Content
              </h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => setModalOpen(true)}
                  varient="primary"
                  size="sm"
                  text="ADD Content"
                  startIcon={<Plus className="w-4 h-4" />}
                />
                <Button
                  onClick={() => alert("Share your Brain With Your Friends")}
                  varient="secondary"
                  size="sm"
                  text="Share Brain"
                  startIcon={<Share2 className="w-4 h-4" />}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {content.map(({ type, link, title, contentId }) => (
                <Card
                  key={contentId}
                  type={type}
                  link={link}
                  title={title}
                  contentId={contentId}
                  onDelete={refresh}
                />
              ))}
            </div>
          </section>

          {/* Content Modal */}
          <ContentModal open={modalopen} onClose={() => setModalOpen(false)} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
