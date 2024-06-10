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

  return (
    <>
      <div className="container">
        <div className="cover">
          <img src={titleData.cover} alt="" />
        </div>
        <div className="information1">
          <h1>{titleData.name} </h1>
          <p className="description">{titleData.description}</p>
          <div className="minibox">
            <h3 className="field">Author</h3>
            <h3> {titleData.author} </h3>
          </div>
          <div className="minibox">
            <h3 className="field">Released </h3>
            <h3>{titleData.releaseYear}</h3>
          </div>
        </div>
      </div>
      <div className="information2">
        <div className="minibox">
          <div className="genres">
            {titleData.genre.map((genre, index) => (
              <p key={index}>{genre}</p>
            ))}
          </div>
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
    </>
  );
};

export default Details;
