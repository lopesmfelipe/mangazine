import Axios from "axios";
import { useState } from "react";

const style = {
  backgroundColor: "black",
  color: "white",
};

function UploadImage() {
  const [imageSelected, setImageSelected] = useState("");

  const x = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "vynhqnd1");

    Axios.post(
      "https://api/cloudinary.com/v1_1/dgwbspp28/image/upload",
      formData
    ).then((response) => console.log(response));
  };

  return (
    <div style={style}>
      <input
        type="file"
        onChange={(event) => {
          setImageSelected(event.target.files);
        }}
      />
      <button onClick={x}> Upload Image </button>
    </div>
  );
}

export default UploadImage;
