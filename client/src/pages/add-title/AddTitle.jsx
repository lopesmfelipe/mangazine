import { useState } from "react";
import "./styles.css";

const AddTitle = () => {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    releaseYear: "",
    description: "",
    chapters: "",
    publishedBy: "",
    genre: [],
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FormData to be sent: ", formData); // Log formData before sending

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
      console.log("Error adding title: ", error.message);
    }

    console.log("FormData sent: ", formData);

    // Reset form fields after submission
    setFormData({
      name: "",
      author: "",
      releaseYear: "",
      description: "",
      chapters: "",
      publishedBy: "",
      genre: [],
    });
  };

  return (
    <div>
      <h2>Add New Title</h2>
      <div className="form-container">
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
              value={formData.volumes}
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
            <label>Cover:</label>
            <input
              type="text"
              name="cover"
              value={formData.cover}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddTitle;
