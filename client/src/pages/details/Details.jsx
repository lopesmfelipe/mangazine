import axios from "axios";
import { useEffect } from "react";

const Details = () => {

  useEffect(() => {
    axios.get("http://localhost:2000/api/v1/titles/")
  })

  return (
    <div>
      <img src="" alt="" />
      <div>
        <h1>Title</h1>
        <h2>author</h2>
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
};

export default Details;
