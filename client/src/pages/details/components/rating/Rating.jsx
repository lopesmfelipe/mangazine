import { useState } from "react";
import RatingPrompt from "../../../../components/rating-prompt/RatingPrompt";
import classes from "./style.module.css";

const Rating = ({ titleData }) => {
  const [showPrompt, setShowPrompt] = useState(false);

  const handleClick = () => {
    setShowPrompt(true);
  };

  const handleClose = () => {
    setShowPrompt(false);
  };

  return (
    <>
      <div className={classes.rating}>
        <p className={classes.type}>Overall Rating</p>
        <div className={classes.score}>
          <i className={`fa-solid fa-star ${classes.fullStar}`}></i>
          <p>9.0</p>
        </div>
      </div>
      <div>
        <div className={classes.rating}>
          <p className={classes.type}>Your Rating</p>
          <div className={classes.score}>
            <i
              className={`fa-regular fa-star ${classes.emptyStar}`}
              onClick={handleClick}
            ></i>
            <p>9.0</p>
          </div>
        </div>
        {showPrompt && (
          <RatingPrompt onClose={handleClose} titleData={titleData} />
        )}
      </div>
    </>
  );
};

export default Rating;
