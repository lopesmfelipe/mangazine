import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllListsPage = ({ userId }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get("http://localhost:200");
        setLists(response.data.data.lists);
      } catch (err) {
        console.error("Error fetching lists: ", err);
      }
    };

    fetchLists();
  }, [userId]);

  return (
    <div>
      <h1>Your Lists</h1>
      <ul>
        {lists.map((list) => (
          <li key={list._id}>
            <Link to={``}>
              {list.title} - {list.titles.length} items
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllListsPage;
