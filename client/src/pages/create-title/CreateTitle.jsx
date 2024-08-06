import classes from "./style.module.css";
import { useState } from "react";
import Axios from "axios";
import FormInput from "./components/form-input/FormInput";
import FormSelect from "./components/form-select/FormSelect";
import GenreSelector from "./components/genre-selector/GenreSelector";
import ImageUploader from "./components/image-uploader/ImageUploader";

const CreateTitle = () => {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    releaseYear: "", // select
    description: "",
    chapters: "",
    publishedBy: "",
    genre: [], // select
    cover: "",
    otherCovers: [],
    type: "", // select
    status: "", // select
    alternateName: "",
  });

  const [imageSelected, setImageSelected] = useState(null); // STATE TO STORE SELECTED IMAGE
  const [isUploading, setIsUploading] = useState(false); // STATE TO TRACK IMAGE UPLOAD STATUS

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleGenreClick = (genre) => {
    setFormData((prevData) => {
      const isGenreAlreadySelected = prevData.genre.includes(genre);
      const updatedGenres = isGenreAlreadySelected
        ? prevData.genre.filter((g) => g !== genre) // Remove the genre already selected by filtering only the ones whose name is not equal to the genre already selected
        : [...prevData.genre, genre];
      return { ...prevData, genre: updatedGenres };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
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
      alternateName: "",
    });
  };

  const genreOptions = [
    "Shounen",
    "Seinen",
    "Shoujo",
    "Fantasy",
    "Adventure",
    "Action",
    "Drama",
    "Comedy",
    "Romance",
    "Mystery",
    "Horror",
    "Thriller",
    "Sci Fi",
    "Historical",
    "Western",
    "Dark Fantasy",
    "Isekai",
  ];

  const typeOptions = ["Manga", "Manhwa", "Manhua", "Comics"];
  const statusOptions = ["Ongoing", "Completed", "Hiatus"];

  return (
    <div>
      <h2>Add New Title</h2>
      <div className={classes["form-container"]}>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Author"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Release Year"
            type="number"
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleChange}
            placeholder="YYYY"
            required
          />

          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <FormInput
            label="Chapters"
            type="number"
            name="chapters"
            value={formData.chapters}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Published By"
            type="text"
            name="publishedBy"
            value={formData.publishedBy}
            onChange={handleChange}
          />

          <GenreSelector
            genres={genreOptions}
            selectedGenres={formData.genre}
            onGenreClick={handleGenreClick}
          />

          <div>
            {formData.genre.map((g, index) => (
              <button
                key={index}
                className={classes.genreButton}
                onClick={(e) => {
                  e.preventDefault();
                  setFormData({
                    ...formData,
                    genre: formData.genre.filter((genre) => genre !== g),
                  });
                }}
              >
                {g}
              </button>
            ))}
          </div>

          <FormSelect
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={typeOptions}
          />
          <FormSelect
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={statusOptions}
          />

          <FormInput
            label="Alternate Name"
            type="text"
            name="alternateName"
            value={formData.alternateName}
            onChange={handleChange}
          />

          <ImageUploader onSelectImage={setImageSelected} />

          <button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTitle;
