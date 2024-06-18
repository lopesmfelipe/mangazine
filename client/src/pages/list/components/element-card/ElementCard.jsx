import { useNavigate } from "react-router-dom";
import "./elementCard.css";

const ElementCard = ({ element }) => {
  const navigate = useNavigate();

  const navigateToDetails = (name) => {
    navigate(`/details/${name}`);
  };

  return (
    <div className="content-container">
      <div className="cover-container">
        <img src={element.cover} alt={element.name} />
      </div>

      <div className="title">
        <p>{element.name}</p>
      </div>

      <div className="info">
        <div className="author-date">
          <p>{element.author} </p>
          <p>{element.releaseYear}</p>
        </div>

        <div className="rating">
          <div className="test">
            <div>
              <i className="fa-solid fa-star fa-2xs"></i>
            </div>
            <div>
              <p>8.0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="button-container">
        <button onClick={() => navigateToDetails(element.name)}>Details</button>
      </div>
    </div>
  );
};

export default ElementCard;
