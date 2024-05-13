import ElementCard from "./ElementCard";
import "../styles/grid.css";
import { useEffect, useState } from "react";

const List = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an HTTP request to fetch data from the database
        const response = await fetch("your-api-endpoint");
        if(!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        // Update state with the fetched data
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []) // Empty dependency array ensures the effect run only once on mount

  return (
    <main className="content-grid">
      {data.map((element, index) => (
        <ElementCard key={index} title={element.title} cover={element.cover} />
      ))}
    </main>
  )
}

export default List;