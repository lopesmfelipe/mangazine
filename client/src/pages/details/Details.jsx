import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./details.css";

const Details = () => {
  const { searchedName } = useParams();
  const [titleData, setTitleData] = useState(null);

  useEffect(() => {
    const fetchTitleData = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:2000/api/v1/titles/search/${searchedName}`
        );
        setTitleData(response.data.data.titles[0]);
      } catch (err) {
        console.error("ERROR ", err);
      }
    };
    console.log(searchedName);
    console.log(titleData);

    fetchTitleData();
  }, [searchedName]);

  useEffect(() => {
    console.log(searchedName, "heloo");
    console.log(titleData, "THIS IS THE DATA");
  }, [titleData]);

  if (!titleData) {
    return <div> Loading...</div>;
  }
  if (titleData) {
    return (
      <div className="container">
        <img src={titleData.cover} alt="" className="cover" />
        <div className="information">
          <h1>{titleData.name} </h1>

          <p className="description">{titleData.description}</p>
          <div className="tiny-information">
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
              <div className="genres">
                <p className="field">Genre:</p>
                {titleData.genre.map((genre, index) => (
                  <p key={index}>{genre}</p>
                ))}
              </div>
            </div>
            <div className="minibox">
              <p className="field">PublishedBy</p>
              <p>{titleData.publishedBy}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Details;
