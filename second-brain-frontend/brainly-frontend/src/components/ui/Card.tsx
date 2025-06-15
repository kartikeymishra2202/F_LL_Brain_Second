import DeleteIcon from "../../icons/DeleteIcon";
import { PlusIcon } from "../../icons/plusIcon";
import { ShareIcon } from "../../icons/shareIcon";
import { Backend_Url } from "../../config";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
  }
}

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "instagram";
  contentId: string;
  onDelete: () => void;
}

export function Card({ title, link, type, contentId, onDelete }: CardProps) {
  function getYouTubeVideoId(url: string): string | null {
    const regExp =
      /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }
  useEffect(() => {
    if (type === "twitter" && window.twttr?.widgets?.load) {
      window.twttr.widgets.load();
    }
  }, [link, type]);

  async function handleDelete() {
    const gettoken = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${Backend_Url}/api/v1/content/deleteContent`,

        {
          headers: {
            Authorization: `Bearer ${gettoken}`,
          },
          data: {
            contentId: contentId,
          },
        }
      );
      if (response.status === 201) {
        toast.success(response.data.message || "Deleted successfully!");
        onDelete();
      } else {
        toast.error("Failed to delete the item.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the item.");
    }
  }
  function getShareUrl() {
    if (type === "twitter") {
      // Twitter share URL format
      return `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`;
    } else if (type === "instagram") {
      // Instagram => just open the post link
      return link;
    } else if (type === "youtube") {
      return link;
    }
    return link;
  }
  return (
    <div className="max-w-72 p-4 bg-white rounded-md border-gray-300 border outline-slate-200">
      <div className="flex justify-between">
        <div className="flex items-center text-2xl">
          <div
            className=" pr-2  text-gray-500 cursor-pointer"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </div>
          <span className="line-clamp-1">{title}</span>
        </div>
        <div className="flex items-center text-2xl">
          <div className=" pr-2 text-gray-500">
            {" "}
            <div
              className="cursor-pointer pr-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                const url = getShareUrl();
                navigator.clipboard.writeText(url);
                toast.success("Share link copied to clipboard!");
              }}
            >
              <ShareIcon />
            </div>
          </div>
          <div className=" pr-2 text-gray-500">
            <PlusIcon />
          </div>
        </div>
      </div>

      <div className="pt-4 flex ">
        {/* in twitter embebbed is used it should be include in the index.html the script file */}
        <div>
          {type == "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
        <div>
          {type == "youtube" && (
            <iframe
              className="w-full"
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(link)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
        </div>
        <div>
          {type === "instagram" && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Instagram Post
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
