import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        <img src="" alt="" className="cover" />
        <div>
          <h1>Title: {searchedName} </h1>
          <h2>author {titleData.author}</h2>
          <h2>Released: </h2>
          <p>description</p>
          <p>Chapters</p>
          <p>Status</p>
          <p>Type:</p>
          <p>Genre(s):</p>
          <p>Published by:</p>
        </div>
      </div>
    );
  }
};

export default Details;
