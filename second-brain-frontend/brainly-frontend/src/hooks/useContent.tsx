import axios from "axios";
import { useEffect, useState } from "react";
import { Backend_Url } from "../config";

export function useContent() {
  const [content, setContent] = useState([]);

  function refresh() {
    const gettoken = localStorage.getItem("token");
    axios
      .get(`${Backend_Url}/api/v1/content/getContent`, {
        headers: {
          Authorization: `Bearer ${gettoken}`,
        },
      })
      .then((response) => {
        setContent(response.data.content);
        // console.log(
        //   "response from data base" + JSON.stringify(response.data.content)
        // );
      })
      .catch((error) => {
        console.error("Failed to fetch content:", error);
      });
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(() => {
      refresh();
    }, 10 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { content, refresh };
}
