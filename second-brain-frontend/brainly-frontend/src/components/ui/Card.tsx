import DeleteIcon from "../../icons/DeleteIcon";
import { PlusIcon } from "../../icons/plusIcon";
import { ShareIcon } from "../../icons/shareIcon";
import { Backend_Url } from "../../config";
import axios from "axios";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  contentId: string;
}

export function Card({ title, link, type, contentId }: CardProps) {
  function getYouTubeVideoId(url: string): string | null {
    const regExp =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

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
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert("Failed to delete the item.");
    }
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
          {title}
        </div>
        <div className="flex items-center text-2xl">
          <div className=" pr-2 text-gray-500">
            {" "}
            <a href={link} target="_blank">
              {" "}
              <ShareIcon />
            </a>
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
      </div>
    </div>
  );
}
