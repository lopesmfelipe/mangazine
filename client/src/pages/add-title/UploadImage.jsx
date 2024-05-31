import Axios from "axios";
import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

function UploadImage() {
  const [imageSelected, setImageSelected] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const cld = new Cloudinary({
    cloud: {
      cloudName: cloudName,
    },
  });

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", uploadPreset);

    Axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    )
      .then((response) => {
        console.log(response);
        setUploadedImageUrl(response.data.public_id);
      })
      .catch((error) => {
        console.error("Error uploading image: ", error);
      });
  };

  const getTransformedUrl = () => {
    if (!uploadedImageUrl) return null;
    const img = cld
      .image(uploadedImageUrl)
      .format("auto")
      .quality("auto")
      .resize(auto().gravity(autoGravity()).width(500).height(500));
    return img.toURL();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        onChange={(event) => {
          setImageSelected(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}> Upload Image </button>
      {uploadedImageUrl && (
        <div>
          <h2>Uploaded and Transformed Image</h2>
          <AdvancedImage cldImg={cld.image(uploadedImageUrl)} />
        </div>
      )}
    </div>
  );
}

export default UploadImage;
