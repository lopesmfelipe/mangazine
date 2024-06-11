import "../styles/elementCard.css";

const ElementCard = ({ element }) => {
  return (
    <div className="content-container">
      <div className="cover-container">
        <img src={element.cover} alt={element.name} />
      </div>
      <div className="element-info">
        <div className="rating">
          <i
            className="fa-solid fa-star fa-2xs"
            style={{ color: "#FFD43B" }}
          ></i>
          <p>8</p>
        </div>
        <div className="title-author-date">
          <p className="title">{element.name}</p>
          <p className="author">{element.author}</p>
          <p className="date">{element.releaseYear}</p>
        </div>
        <div className="button-container">
          <button>Details</button>
        </div>
      </div>
    </div>
  );
};

export default ElementCard;
