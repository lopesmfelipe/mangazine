import classes from "./rating.module.css";

const Rating = ({ name }) => {
  if (name === "overall rating") {
    return (
      <div className={classes.rating}>
        <p className={classes.type}>{name}</p>
        <div className={classes.score}>
          <i className="fa-solid fa-star full-star"></i>
          <p className={classes.score}>9.0</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.rating}>
        <p className={classes.type}>{name}</p>
        <div className={classes.score}>
          <i className={`fa-regular fa-star ${classes["empty-star"]}`}></i>
          <p className={classes.score}>9.0</p>
        </div>
      </div>
    );
  }
};

export default Rating;
