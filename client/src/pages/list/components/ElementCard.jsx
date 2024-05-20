import "../styles/elementCard.css";

const ElementCard = ({ title, cover }) => {
  return (
    <div className="content-container">
      <div className="cover-container">
        <img src={cover} alt={title} />
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
          <p className="title">{title}</p>
          <p className="author">sumi Eno</p>
          <p className="date">2001</p>
        </div>
        <div className="button-container">
          <button>Details</button>
        </div>
      </div>
    </div>
  );
};

export default ElementCard;
