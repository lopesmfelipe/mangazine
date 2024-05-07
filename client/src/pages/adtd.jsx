const AddTitle = () => {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    releaseDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("localhost:2000/api/v1/titles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setFormData({ name: "", author: "", releaseDate: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={FormData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="author">Name:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={FormData.author}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="releaseDate">Name:</label>
        <input
          type="text"
          id="releaseDate"
          name="releaseDate"
          value={FormData.releaseDate}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddTitle;