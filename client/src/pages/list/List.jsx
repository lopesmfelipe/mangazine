import classes from "./list.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ElementCard from "./components/element-card/ElementCard";
import { useParams } from "react-router-dom";

const List = () => {
  const { searchedList } = useParams();
  const [titles, setTitles] = useState([]);
  const [error, setError ] = useState(null);

  useEffect(() => {
    // FETCH TITLES FROM THE API
    axios
      .get(`http://localhost:2000/api/v1/lists/search/${searchedList}`)
      .then((response) => {
        setTitles(response.data.data.list.titles);
      })
      .catch((err) => {
        console.error("Error fetching titles: ", err);
        setError(`Faile to fetch titles. Error message: ${err}`)
      });
  }, [searchedList]); // Empty dependency array ensures the effect runs only once

  if (error) {
    return <div>{error}</div>
  }

  return (
    <main className={classes["content-grid"]}>
      {titles.map((element, index) => (
        <ElementCard key={index} element={element} />
      ))}
    </main>
  );
};

export default List;
