import { useEffect, useState } from "react";
import axios from "axios";
import ElementCard from "./components/ElementCard";
import "./styles/list.css";

const List = () => {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    // Fetch title data from the backend API
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
      {titles.map((title, index) => (
        <ElementCard key={index} title={title.name} cover={title.cover} />
      ))}
    </main>
  );
};

export default List;
