import classes from "./style.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ElementCard from "../../components/element-card/ElementCard";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Readlist = () => {
  const { user } = useUser();
  const [readList, setReadList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      if (!user || !user.id) {
        return <div> No user found </div>;
      }
      console.log(user.id);
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/user/${user.id}/readlist`
        );
        setReadList(response.data.data.readList);
        console.log(readList);
      } catch (err) {
        console.error(`Failed to fetch Readlist. Error message: ${err}`);
        setError(`Failed to fetch Readlist. Error message: ${err}`);
      }
    };
    fetchItems();

    document.body.classList.add(classes.bodyStyle);

    return () => {
      document.body.classList.remove(classes.bodyStyle);
    };
  }, [user]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <div className={classes.header}>
          <div className={classes.titleContainer}>
            <p>MANGAZINE</p>
          </div>

          <div className={classes.links}>
            <Link to="/home" className={classes.link}>
              HOME
            </Link>
            <Link to="/lists" className={classes.link}>
              LISTS
            </Link>
          </div>
        </div>

        <div className={classes.listName}>READLIST</div>
      </div>

      <main className={classes.contentGrid}>
        {readList.map((element, index) => (
          <ElementCard key={index} element={element} />
        ))}
      </main>
    </div>
  );
};

export default Readlist;
