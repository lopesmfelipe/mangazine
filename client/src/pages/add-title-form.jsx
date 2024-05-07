import { useState } from "react";

export const addTitleForm = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [volumes, setVolumes] = useState("");
  const [publishedBy, setPublishedBy] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTitle = {
      name: name,
      author: author,
      releaseDate: releaseDate,
      volumes: volumes,
      publishedBy: publishedBy,
      genre: genre,
    };

    setName("");
    setAuthor("");
    setReleaseDate("");
    setVolumes("");
    setPublishedBy("");
    setGenre("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Name:</label>
          <input
            type="text"
            required
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Author:</label>
          <input
            type="text"
            required
            className="input"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>releaseDate:</label>
          <input
            type="text"
            required
            className="input"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Volumes:</label>
          <input
            type="text"
            required
            className="input"
            value={volumes}
            onChange={(e) => setVolumes(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>PublishedBy:</label>
          <input
            type="text"
            required
            className="input"
            value={publishedBy}
            onChange={(e) => setPublishedBy(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Genre:</label>
          <input
            type="text"
            required
            className="input"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <button type="submit" className="button">
          Add Title
        </button>
      </form>
    </div>
  );
};
