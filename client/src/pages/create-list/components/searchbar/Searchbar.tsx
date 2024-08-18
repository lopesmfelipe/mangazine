import classes from "./style.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface SearchbarProps {
  placeholder: string;
}

const Searchbar = ({ placeholder}) => {
  const [searchedName, setSearchedName] = useState("");
  const [items, setItems] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = async (event: any) => {
    
  }

  const handleClick = () => {

  }

  return (
    <div className={classes.container}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchedName}
        onChange={(event) => setSearchedName(event.target.value)}
        onKeyDown={handleSearch}
        className={classes.searchbar}
      />
      {loading && <div className={classes.loading}> Loading...</div>}
      {showResults && !loading && (
        <div>
        <div
          className={`${classes.gridContainer} ${
            showResults ? "" : classes.hidden
          }`}
        >
          {items.map((item) => (
            <div
              key={item._id}
              onClick={() => handleClick(item)}
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
        </div>
      )}
    </div>
  );

}

export default Searchbar;


