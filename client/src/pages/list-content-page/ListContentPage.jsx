import classes from "./style.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ElementCard from "./components/element-card/ElementCard";
import { Link, useParams } from "react-router-dom";

const ListContentPage = () => {
  const { searchedList } = useParams(); // Get listId from URL
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [list, setList] = useState({});

  useEffect(() => {
    // FETCH ITEMS FROM THE LIST
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/lists/${searchedList}`
        );
        setList(response.data.data.list);
        setItems(response.data.data.list.titles);
      } catch (err) {
        console.error(`Failed to fetch list items. Error message: ${err}`);
        setError(`Failed to fetch list items. Error message: ${err}`);
      }
    };
    fetchItems();

    document.body.classList.add(classes.bodyStyle);

    return () => {
      document.body.classList.remove(classes.bodyStyle);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <div className={classes.header}>
          <p>MANGAZINE</p>

          <div className={classes.links}>
            <Link to="/home" className={classes.link}>
              HOME
            </Link>
            <Link to="" className={classes.link}>
              READLIST
            </Link>
            <Link to="/lists" className={classes.link}>
              LISTS
            </Link>
          </div>
        </div>

        <div className={classes.listName}>{list.name}</div>
      </div>

      <main className={classes.contentGrid}>
        {items.map((element, index) => (
          <ElementCard key={index} element={element} />
        ))}
      </main>
    </div>
  );
};

export default ListContentPage;
