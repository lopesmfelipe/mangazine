import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

const CreateList = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    userId: user?.id ?? "",
    name: "",
    titles: [],
  });

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (user) { 'a'
      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: user.id,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "titles") {
      const titles = value.split(",");
      setFormData((prevFormData) => ({ ...prevFormData, titles: titles }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    console.log("FormData being sent: ", formData);


    try {
      const response = await fetch("http://localhost:2000/api/v1/lists/create-list", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("List created successfully");
      } else {
        console.error("Failed to create list");
      }
    } catch (err) {
      console.error("Error creating list", err);
    }

    console.log("FormData sent: ", formData);

    setFormData({
      userId: user.id,
      name: "",
      titles: [],
    });

    setIsUploading(false);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="">Titles</label>
          <input
            type="text"
            name="titles"
            value={formData.titles}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isUploading ? "Uploading..." : "Submit"}</button>
      </form>
    </main>
  );
};

export default CreateList;
