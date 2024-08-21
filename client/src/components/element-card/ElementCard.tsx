import classes from "./style.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RatingPrompt from "../rating-prompt/RatingPrompt";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import Tag from "./components/Tag";

const ElementCard = ({ element }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [averageRating, setAverageRating] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  const titleId = element?._id;
  const userId = user?.id;

  useEffect(() => {
    console.log("Title ID: ", titleId);
    if (!user) return;

    const fetchRatings = async () => {
      try {
        // Fetch average rating
        const avgResponse = await axios.get(
          `http://localhost:2000/api/v1/rating/average-rating/${titleId}`
        );
        setAverageRating(avgResponse.data.averageRating);
        
        // Fetch user rating
        try {
          const userResponse = await axios.get(
            `http://localhost:2000/api/v1/rating/${userId}/get-rating/${titleId}`
          );
          setUserRating(userResponse.data.userRating.rating);
        } catch (userErr) {
          // Handle the case where no user rating is found
          if (userErr.response?.status === 404) {
            setUserRating(null);
          } else {
            console.error("Failed to fetch user rating: ", userErr);
          }
        }
      } catch (err) {
        console.error("Failed to fetch average rating: ", err.message);
      }
    };

    fetchRatings();
  }, [user, titleId, userId]);

  const navigateToDetails = (titleId) => {
    navigate(`/details/${titleId}`);
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

          <div className={classes.rating}>
            <div className={classes.test}>
              <div className={classes.avgRating}>
                <i className="fa-solid fa-star fa-2xs"></i>
              </div>
              <div>
                <p>{averageRating ? averageRating.toFixed(1) : "N/A"}</p>
              </div>
            </div>
            <div className={classes.test} onClick={openPrompt}>
              <div className={classes.userRating}>
                <i
                  className={
                    userRating
                      ? `fa-solid fa-star fa-2xs`
                      : `fa-regular fa-star fa-2xs`
                  }
                ></i>
              </div>
              <div>
                <p>{userRating ? Math.round(userRating) : "Rate"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={classes["button-container"]}>
          <div>
            <button
              onClick={() => navigateToDetails(element._id)}
              className={classes.elementCardButton}
            >
              Details
            </button>
          </div>
          <div className={classes.tag}>
            {userId && <Tag userId={userId} titleId={titleId} />}
          </div>
        </div>
      </div>
      {showPrompt && <RatingPrompt onClose={closePrompt} titleData={element} />}
    </>
  );
};

export default ElementCard;
