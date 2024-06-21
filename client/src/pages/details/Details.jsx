import classes from "./details.module.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdditionalInformation from "./components/additional-information/AdditionalInformation";
import Rating from "./components/rating/Rating";
import AddToReadlist from "./components/add-to-readlist/AddToReadlist";

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
      <div className={classes.container}>
        <div className={classes.cover}>
          <img src={titleData.cover} alt="" />
        </div>
        <div className={classes.information1}>
          <div className={classes["top-container"]}>
            <div>
              <h1>{titleData.name} </h1>
            </div>
            <Rating name="overall rating" />
            <Rating name="your rating" />
          </div>
          <div className={classes["description-container"]}>
            <p>{titleData.description}</p>
          </div>
          <div>
          <div className={classes.minibox}>
            <h3 className={classes.field}>Author</h3>
            <h3> {titleData.author} </h3>
          </div>
          <div className={classes.minibox}>
            <h3 className={classes.field}>Released </h3>
            <h3>{titleData.releaseYear}</h3>
          </div>
        <AddToReadlist />

          </div>
        </div>
      </div>
      <AdditionalInformation titleData={titleData} />
    </>
  );
};

export default Details;
