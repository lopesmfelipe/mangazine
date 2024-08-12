import classes from "./style.module.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdditionalInformation from "./components/additional-information/AdditionalInformation";
import Rating from "./components/rating/Rating";
import AddButton from "./components/add-button/AddButton";

const Details = () => {
  const { searchedName } = useParams();
  const [titleData, setTitleData] = useState(null);

  useEffect(() => {
    const fetchTitleData = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:2000/api/v1/titles/search?name=${searchedName}`
        );
        setTitleData(response.data.data.titles[0]);
      } catch (err) {
        console.error("ERROR", err);
      }
    };

    fetchTitleData();
  }, [searchedName]);

  if (!titleData) {
    return <div> Loading...</div>;
  }

  return (
    <div className={classes.detailsBody}>
      <div className={classes.container}>
        <div className={classes.cover}>
          <img src={titleData.cover} alt="" />
        </div>
        <div className={classes.information1}>
          <div className={classes["top-container"]}>
            <div>
              <h1 className={classes.titleName}>{titleData.name} </h1>
            </div>
            <Rating titleData={titleData} />
          </div>
          <div className={classes["description-container"]}>
            <p>{titleData.description}</p>
          </div>
          <div className={classes["author-released-button"]}>
            <div>
              <div className={classes.minibox}>
                <h3 className={classes.field}>Author</h3>
                <h3> {titleData.author} </h3>
              </div>
              <div className={classes.minibox}>
                <h3 className={classes.field}>Released </h3>
                <h3>{titleData.releaseYear}</h3>
              </div>
            </div>
            <div className={classes["addition-button"]}>
              <AddButton titleData={titleData} />
            </div>
          </div>
        </div>
      </div>
      <AdditionalInformation titleData={titleData} />
    </div>
  );
};

export default Details;
