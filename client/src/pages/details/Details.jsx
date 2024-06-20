import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./details.css";
import AdditionalInformation from "./components/additional-information/AdditionalInformation";
import Rating from "./components/rating/Rating";

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
          <div className="top-container">
            <div>
              <h1>{titleData.name} </h1>
            </div>
            <Rating name="overall rating" />
            <Rating name="your rating" />
          </div>
          <div className="description-container">
            <p>{titleData.description}</p>
          </div>
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
      <AdditionalInformation titleData={titleData} />
    </>
  );
};

export default Details;
