import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Backend_Url } from "../config";

export function useContent() {
  const [content, setContent] = useState([]);

  const refresh = useCallback(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${Backend_Url}/api/v1/content/getContent`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setContent(response.data.content);
      })
      .catch((error) => {
        console.error("Failed to fetch content:", error);
      });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { content, refresh };
}
