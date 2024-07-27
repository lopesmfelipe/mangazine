import classes from "./style.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RatingPrompt from "../rating-prompt/RatingPrompt";
import { Axios } from "axios";

const ElementCard = ({ titleData }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [averageRating, setAverageRating] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await Axios.get(
          `http:localhost:2000/api/v1/ratings/${titleData.id}/general-rating`
        );
        setAverageRating(response.data.averageRating);
      } catch (err) {
        console.error("Error", err);
      }
    };

    const fetchTitleRating = async () => {
      try {
        const response = await Axios.get(``)
      } catch (err) {
        console.error('Error', err);
      }
    }

    fetchAverageRating;
  }, []);

  const navigateToDetails = (name) => {
    navigate(`/details/${name}`);
  };

  const handleClick = () => {
    setShowPrompt(true);
  };

  const handleClose = () => {
    setShowPrompt(false);
  };

  return (
    <>
      <div className={classes["content-container"]}>
        <div className={classes["cover-container"]}>
          <img src={titleData.cover} alt={titleData.name} />
        </div>

        <div className={classes["title"]}>
          <p>{titleData.name}</p>
        </div>

        <div className={classes["info"]}>
          <div className={classes["author-date"]}>
            <p>{titleData.author} </p>
            <p>{titleData.releaseYear}</p>
          </div>

          <div className={classes.rating}>
            <div className={classes.test}>
              <div>
                <i className="fa-solid fa-star fa-2xs"></i>
              </div>
              <div>
                <p>8.0</p>
              </div>
            </div>
            <div className={classes.test} onClick={handleClick}>
              <div>
                <i className="fa-regular fa-star fa-2xs"></i>
              </div>
              <div>
                <p>Rate</p>
              </div>
            </div>
          </div>
        </div>

        <div className={classes["button-container"]}>
          <button
            onClick={() => navigateToDetails(titleData.name)}
            className={classes.elementCardButton}
          >
            Details
          </button>
        </div>
      </div>
      {showPrompt && (
        <RatingPrompt onClose={handleClose} titleData={titleData} />
      )}
    </>
  );
};

export default ElementCard;
