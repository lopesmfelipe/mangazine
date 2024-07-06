import classes from "./style.module.css";
import { useNavigate } from "react-router-dom";

const ElementCard = ({ element }) => {
  const navigate = useNavigate();

  const navigateToDetails = (name) => {
    navigate(`/details/${name}`);
  };

  return (
    <div className={classes["content-container"]}>
      <div className={classes["cover-container"]}>
        <img src={element.cover} alt={element.name} />
      </div>

      <div className={classes["title"]}>
        <p>{element.name}</p>
      </div>

      <div className={classes["info"]}>
        <div className={classes["author-date"]}>
          <p>{element.author} </p>
          <p>{element.releaseYear}</p>
        </div>

        <div className={classes["rating"]}>
          <div className={classes["test"]}>
            <div>
              <i className="fa-solid fa-star fa-2xs"></i>
            </div>
            <div>
              <p>8.0</p>
            </div>
          </div>
        </div>
      </div>

      <div className={classes["button-container"]}>
        <button onClick={() => navigateToDetails(element.name)}>Details</button>
      </div>
    </div>
  );
};

export default ElementCard;
