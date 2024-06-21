import classes from "./addTitle.module.css";
import { useState } from "react";
import Axios from "axios";

const AddTitle = () => {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    releaseYear: "",
    description: "",
    chapters: "",
    publishedBy: "",
    genre: [],
    cover: "",
    otherCovers: [],
    type: "",
    status: "",
    alternateName: ""
  });

  const [imageSelected, setImageSelected] = useState(null); // STATE TO STORE SELECTED IMAGE
  const [isUploading, setIsUploading] = useState(false); // STATE TO TRACK IMAGE UPLOAD STATUS

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For the genre field, split the input value by spaces
    if (name === "genre") {
      const genres = value.split(",");
      setFormData({ ...formData, genre: genres });
    } else {
      // For other fields, update the formData state as usual
      setFormData({ ...formData, [name]: value });
    }
  };

  const uploadImage = async () => {
    if (!imageSelected) {
      alert("Please select an image before submitting.");
      setIsUploading(false);
      return null;
    }

    const imageData = new FormData();
    imageData.append("file", imageSelected);
    imageData.append("upload_preset", uploadPreset);

    try {
      const response = await Axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        imageData
      );
      const imageUrl = response.data.secure_url; //
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true); // SET TO TRUE BEFORE IMAGE UPLOAD STARTS

    const imageUrl = await uploadImage();
    if (imageUrl) {
      formData.cover = imageUrl;
    } else {
      alert("Image upload failed. Please try again.");
      setIsUploading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:2000/api/v1/titles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Title added successfully");
      } else {
        console.error("Failed to add title:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding title: ", error.message);
    }

    console.log("FormData sent: ", formData);

    setFormData({
      name: "",
      author: "",
      releaseYear: "",
      description: "",
      chapters: "",
      publishedBy: "",
      genre: [],
      cover: "",
      otherCovers: [],
      type: "",
      status: "",
      alternateName: ""
    });
  };

  return (
    <div>
      <h2>Add New Title</h2>
      <div className={classes["form-container"]}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Author:</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Release Year:</label>
            <input
              type="text"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              placeholder="YYYY"
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Chapters:</label>
            <input
              type="number"
              name="chapters"
              value={formData.chapters}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Published By:</label>
            <input
              type="text"
              name="publishedBy"
              value={formData.publishedBy}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Genre:</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Type:</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={formData.genre}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Alternate Name:</label>
            <input
              type="text"
              name="alternate-name"
              value={formData.genre}
              onChange={handleChange}
            />
          </div>
          <div className={classes.uploadImage}>
            <label>Cover:</label>
            <div>
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(event) => {
                  setImageSelected(event.target.files[0]);
                }}
              />
            </div>
          </div>
          <button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTitle;
