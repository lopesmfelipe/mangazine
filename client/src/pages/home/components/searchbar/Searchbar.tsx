import classes from "./style.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Searchbar = () => {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (event: any) => {
    if (event.key === "Enter" && name.trim() !== "") {
      setLoading(true);
      try {
        console.log(name);
        const response = await axios.get(
          `http://localhost:2000/api/v1/titles/search/${name}`
        );
        const titles = response.data.titles;
        setItems(titles);
        setShowResults(true);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClick = (titleId: string) => {
    console.log(titleId);
    navigate(`/details/${titleId}`);
  };

  return (
    <div className={classes.container}>
      <input
        type="text"
        placeholder="Search"
        value={name}
        onChange={(event) => setName(event.target.value)}
        onKeyDown={handleSearch}
        className={classes.searchbar}
      />
      {loading && <div className={classes.loading}> Loading...</div>}
      {showResults && !loading && (
        <div
          className={`${classes.gridContainer} ${
            showResults ? "" : classes.hidden
          }`}
        >
          {items.map((item) => (
            <div
              key={item._id}
              onClick={() => handleClick(item._id)}
              className={classes.gridItem}
            >
              <img src={item.cover} className={classes.cover} />
              <div className={classes.informationContainer}>
                <p className={classes.name}>{item.name}</p>
                <div className={classes.box2}>
                  <p className={classes.author}>{item.author} • </p>
                  <p className={classes.releaseYear}> {item.releaseYear}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
