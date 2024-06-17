import "./style.css";

const ElementCard = ({ element }) => {
  return (
    <div className="content-container">
      <div className="cover-container">
        <img src={element.cover} alt={element.name} />
      </div>
      <div className="rating">
        <i className="fa-solid fa-star fa-2xs icon"></i>
        <p className="rating">8</p>
      </div>
      <div className="info">
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
