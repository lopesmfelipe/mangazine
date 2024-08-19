import classes from "./style.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import CreateListButton from "./components/create-button/CreateListButton";
import Header from "../../components/header/Header";

const AllListsPage = () => {
  const { user } = useUser();
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  const click = (list: any) => {
    navigate(`/list/${list._id}`);
  };

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
  }, [user]);

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.headline}>
        <h1>Your Lists</h1>
      </div>
      <CreateListButton />
      <div className={classes.grid}>
        {lists.map((list, index) => (
          <div className={classes.box} onClick={() => click(list._id)}>
            <div className={classes.listNameContainer}>
              <p>{list.name}</p>
            </div>
            <p>{list.titles.length} titles </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllListsPage;
