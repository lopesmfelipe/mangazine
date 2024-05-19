import { useState } from "react";
import "./styles.css";

const AddTitle = () => {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    releaseYear: "",
    description: "",
    volumes: "",
    publishedBy: "",
    genre: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      volumes: "",
      publishedBy: "",
      genre: "",
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
              type="number"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              placeholder="YYYY"
              min="1200"
              max="2100"
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
            <label>Volumes:</label>
            <input
              type="number"
              name="volumes"
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
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
            >
              <option value="">Select Genre</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Romance">Romance</option>
              <option value="Mystery">Mystery</option>
              <option value="Thriller">Thriller</option>
              <option value="Horror">Horror</option>
              <option value="Historical">Historical</option>
              <option value="Action">Action</option>
              <option value="Shounen">Shounen</option>
              <option value="Seinen">Seinen</option>
              <option value="Shoujo">Shoujo</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddTitle;
