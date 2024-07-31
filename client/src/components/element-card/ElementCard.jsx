import classes from "./style.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RatingPrompt from "../rating-prompt/RatingPrompt";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const ElementCard = ({ titleData }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [averageRating, setAverageRating] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  const titleId = titleData?._id;
  const userId = user?.id;

  useEffect(() => {
    console.log("Title ID: ", titleId)
    if (!user) return;

    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/rating/average-rating/${titleId}`
        );
        console.log("Average Rating: ", response);
        setAverageRating(response.data.averageRating);
        console.log(userRating);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUserRating = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/rating/${userId}/get-rating/${titleId}`
        );
        setUserRating(response.data.userRating.rating);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAverageRating();
    fetchUserRating();
  }, [user, titleId]);

  const navigateToDetails = (name) => {
    navigate(`/details/${name}`);
  };

  const openPrompt = () => {
    setShowPrompt(true);
  };

  const closePrompt = () => {
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
                <p>{averageRating ? averageRating.toFixed(1) : "N/A"}</p>
              </div>
            </div>
            <div className={classes.test} onClick={openPrompt}>
              <div>
                <i className="fa-regular fa-star fa-2xs"></i>
              </div>
              <div>
                <p>{userRating ? Math.round(userRating) : "Rate"}</p>
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
        <RatingPrompt onClose={closePrompt} titleData={titleData} />
      )}
    </>
  );
};

export default ElementCard;
