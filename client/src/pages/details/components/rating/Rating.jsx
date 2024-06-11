import "./style.css";

const Rating = ({ name }) => {
  if (name === "overall rating") {
    return (
      <div className="rating">
        <p className="type">{name}</p>
        <div className="score">
          <i className="fa-solid fa-star full-star"></i>
          <p className="score">9.0</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="rating">
        <p className="type">{name}</p>
        <div className="score">
          <i className="fa-regular fa-star empty-star"></i>
          <p className="score">9.0</p>
        </div>
      </div>
    );
  }
};

export default Rating;
