import classes from "./style.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import CreateListButton from "./components/create-button/CreateListButton";
import Header from "../../components/header/Header";

const AllListsPage = () => {
  const { user } = useUser();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      if (!user || !user.id) {
        return <div>No user</div>;
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

    document.body.classList.add(classes.bodyStyle);

    return () => {
      document.body.classList.remove(classes.bodyStyle);
    };
  }, [user]);

  return (
    <div className={classes.allListsBody}>
      <Header />
      <div className={classes.header}>
        <h1>Your Lists</h1>
      </div>
      <CreateListButton />
      <div className={classes.boxContainer}>
        {lists.map((list, index) => (
          <Link
            to={`/list/${list._id}`}
            key={index}
            className={classes.noDecoration}
          >
            <div className={classes.box}>
              <h3 className={classes.listName}>{list.name}</h3>
              <p>{list.titles.length} titles </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllListsPage;
