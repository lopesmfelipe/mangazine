import classes from "./style.module.css";

const RatingPrompt = ({ onClose, titleData }) => {
  return (
    <div className={classes.promptBackdrop}>
      <div className={classes.promptWindow}>
        <div className={classes.theHeader}>
          <img src={titleData.cover} className={classes.cover} />
          <p className={classes.mainText}>RATE</p>
          <p className={classes.titleName}>Berserk</p>
        </div>

        <div className={classes.rating}>
          <input type="radio" name="star" id="star1" />
          <label htmlFor="star1"></label>
          <input type="radio" name="star" id="star2" />
          <label htmlFor="star2"></label>
          <input type="radio" name="star" id="star3" />
          <label htmlFor="star3"></label>
          <input type="radio" name="star" id="star4" />
          <label htmlFor="star4"></label>
          <input type="radio" name="star" id="star5" />
          <label htmlFor="star5"></label>
          <input type="radio" name="star" id="star6" />
          <label htmlFor="star6"></label>
          <input type="radio" name="star" id="star7" />
          <label htmlFor="star7"></label>
          <input type="radio" name="star" id="star8" />
          <label htmlFor="star8"></label>
          <input type="radio" name="star" id="star9" />
          <label htmlFor="star9"></label>
          <input type="radio" name="star" id="star10" />
          <label htmlFor="star10"></label>
        </div>
        <div className={classes.buttonContainer}>
          <button className={classes.button1}>Rate</button>
          <button className={classes.button2}>Remove rating</button>
        </div>
        <button onClick={onClose} className={classes.closeButton}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default RatingPrompt;
