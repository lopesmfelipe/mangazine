import classes from "./style.module.css";

const RatingPrompt = ({ onClose, titleData}) => {
  return (
    <div className={classes.container}>
      <h2>rate</h2>
      <div className={classes.rating}>
        <input type="radio" name="rating" />
        <input type="radio" name="rating" />
        <input type="radio" name="rating" />
        <input type="radio" name="rating" />
        <input type="radio" name="rating" />
        <input type="radio" name="rating" />
        <input type="radio" name="rating" />
        <input type="radio" name="rating" />
        <input type="radio" name="rating" />
        <input type="radio" name="rating" />  
      </div>
    </div>
  );
};

export default RatingPrompt;
