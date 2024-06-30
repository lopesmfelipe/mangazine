import classes from "./allListsPage.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AllListsPage = () => {
  const { user } = useUser();
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLists = async () => {
      if (!user || !user.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/user/lists/${user.id}`
        );
        setLists(response.data.data.lists);
        console.log(lists);
      } catch (err) {
        console.error("Error fetching lists: ", err);
      }
    };

    fetchLists();
  }, [user]);

  if (loading) {
    return <div className={classes.container}>Loading...</div>;
  }

  return (
    <div className={classes.container}>
      <h1>Your Lists</h1>
      <div>
        {lists.map((list) => (
          <>
            <div key={list._id}>{list.name}</div>
            <div>hello, those are the lists: {list.name}</div>
          </>
        ))}
      </div>
      <div>hello, those are the lists:</div>
    </div>
  );
};

export default AllListsPage;
