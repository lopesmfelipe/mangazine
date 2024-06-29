import classes from "./allListsPage.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AllListsPage = () => {
  const { user } = useUser();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      if (!user || !user.id) {
        return;
      }
      
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/user/lists",
          {
            params: {
              userId: user.id,
            },
          }
        );
        setLists(response.data.data.lists);
      } catch (err) {
        console.error("Error fetching lists: ", err);
      }
    };

    fetchLists();
  }, [user]);

  if (!user || !user.id) {
    return <div className={classes.container}>Loading...</div>
  }

  return (
    <div className={classes.container}>
      <h1>Your Lists</h1>
      <ul>
        {lists.map((list) => (
          <li key={list._id}>
            hellow
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllListsPage;
