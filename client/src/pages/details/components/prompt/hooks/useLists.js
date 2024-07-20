import { useState, useEffect } from "react";
import axios from "axios";

export const useLists = (userId, titleId) => {
  const [lists, setLists] = useState([]);
  const [titleExists, setTitleExists] = useState({});

  useEffect(() => {
    if (!userId) return;

    const fetchLists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/user/lists/${userId}`
        );
        const fetchedLists = response.data.data.lists;
        setLists(fetchedLists);

        const checkExistence = async () => {
          const titleExistsMap = {};
          await Promise.all(
            fetchedLists.map(async (list) => {
              const exists = await checkTitleExists(list._id, titleId);
              titleExistsMap[list._id] = exists;
              console.log(`List ID: ${list._id}, Title Exists: ${exists}`);
            })
          );
          console.log("INITIAL titleExistsMap💊 ", titleExistsMap);
          setTitleExists(titleExistsMap);
        };

        checkExistence();
      } catch (err) {
        console.error("Error fetching lists: ", err);
      }
    };

    fetchLists();
  }, [userId, titleId]);

  const checkTitleExists = async (listId, titleId) => {
    try {
      const response = await axios.get(
        `http://localhost:2000/api/v1/lists/${listId}/titles/${titleId}/exists`
      );
      return response.data.exists;
    } catch (err) {
      console.error("Error trying to check if the title is in the list: ", err);
      return false;
    }
  };

  return { lists, titleExists, setTitleExists };
};
