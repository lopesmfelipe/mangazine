import "./style.css";

const AdditionalInformation = ({ titleData }) => {
  return (
    <div className="information2">
      <div className="genres">
        {titleData?.genre?.map((genre, index) => (
          <p key={index}>{genre}</p>
        ))}
      </div>
      <div className="minibox">
        <p className="field">Chapters</p>
        <p>{titleData.chapters}</p>
      </div>
      <div className="minibox">
        <p className="field">Status</p>
        <p>{titleData.status}</p>
      </div>
      <div className="minibox">
        <p className="field">Type</p>
        <p>{titleData.type}</p>
      </div>

      <div className="minibox">
        <p className="field">Published by</p>
        <p>{titleData.publishedBy}</p>
      </div>
    </div>
  );
};

export default AdditionalInformation;
