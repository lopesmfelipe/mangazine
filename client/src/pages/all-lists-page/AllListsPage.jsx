import classes from "./style.module.css";
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
    <div className={classes.allListsBody}>
      <div className={classes.topMenu}>
        <p>Menu</p>
      </div>
      <div className={classes.header}>
        <h1>Your Lists</h1>
      </div>
      <div className={classes.boxContainer}>
        {lists.map((list, index) => (
          <Link to={`/list/${list._id}`} key={index}>
            <div className={classes.box}>
              <div>
                <h3 className={classes.listName}>{list.name}</h3>
              </div>
              <div>{list.titles.length} titles </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllListsPage;
