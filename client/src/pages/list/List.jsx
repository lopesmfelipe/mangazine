import { useEffect, useState } from "react";
import axios from "axios";
import ElementCard from "./components/element-card/ElementCard";
import "./list.css";

const List = () => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    // FETCH TITLES FROM THE API
    axios
      .get("http://localhost:2000/api/v1/titles")
      .then((response) => {
        setTitles(response.data.data.titles);
      })
      .catch((error) => {
        console.error("Error fetching titles: ", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <main className="content-grid">
      {titles.map((element, index) => (
        <ElementCard key={index} element={element} />
      ))}
    </main>
  );
};

export default List;
