import "./additionalInformation.css";

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
        <p className="data">{titleData.chapters}</p>
      </div>
      <div className="minibox">
        <p className="field">Status</p>
        <p className="data">{titleData.status}</p>
      </div>
      <div className="minibox">
        <p className="field">Type</p>
        <p className="data">{titleData.type}</p>
      </div>

      <div className="minibox">
        <p className="field">Published by</p>
        <p className="data">{titleData.publishedBy}</p>
      </div>
    </div>
  );
};

export default AdditionalInformation;
