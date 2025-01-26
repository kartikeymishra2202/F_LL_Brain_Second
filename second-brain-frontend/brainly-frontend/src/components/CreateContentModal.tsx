import { useRef, useState } from "react";
import { CrossIcon } from "../icons/crossIcon";
import { Button } from "./ui/Button";
import { Backend_Url } from "../config";
import axios from "axios";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function ContentModal({ open, onClose }) {
  const [type, setType] = useState(ContentType.Youtube);
  const linkRef = useRef<HTMLInputElement>();
  const titleRef = useRef<HTMLInputElement>();

  async function addContent() {
    const link = linkRef.current?.value;
    const title = titleRef.current?.value;

    if (!link || !title) {
      alert("Please Provide all Fields.");
    } else {
      const gettoken = localStorage.getItem("token");
      try {
        await axios.post(
          `${Backend_Url}/api/v1/content/addContent`,
          {
            link,
            title,
            type,
          },
          {
            headers: {
              Authorization: `Bearer ${gettoken}`,
            },
          }
        );
        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen  fixed top-0 left-0  flex justify-center">
          <div className="absolute w-full h-full bg-black bg-opacity-50"></div>
          <div className="relative z-10 flex justify-center flex-col">
            <span className="bg-white p-4 rounded-xl ">
              <div className="flex justify-end">
                <button onClick={onClose}>
                  {" "}
                  <CrossIcon />
                </button>
              </div>
              <div>
                <h2 className="bg-gray-400 text-slate-800 w-40 p-3 rounded">
                  ADD New Content
                </h2>
                <Input placeholder={"Title"} reference={titleRef} />

                <Input placeholder={"Link"} reference={linkRef} />
                <div className="flex flex-col w-28 p-2 gap-2">
                  <h4>Select Type:</h4>
                  <Button
                    text="Youtube"
                    size="sm"
                    varient={
                      type === ContentType.Youtube ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(ContentType.Youtube);
                    }}
                  />
                  <Button
                    text="Twitter"
                    size="sm"
                    varient={
                      type === ContentType.Twitter ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(ContentType.Twitter);
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center text-center mt-2 ">
                <Button
                  varient="primary"
                  text="Submit"
                  size="sm"
                  onClick={addContent}
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export function Input({
  reference,
  placeholder,
}: {
  reference?: any;
  placeholder: string;
}) {
  return (
    <>
      <div>
        <input
          type="text"
          className="px-2 py-1 mt-2 w-full text-blue-950 border shadow"
          ref={reference}
          placeholder={placeholder}
        ></input>
      </div>
    </>
  );
}
