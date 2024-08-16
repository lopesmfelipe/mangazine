import { useUser } from "@clerk/clerk-react";
import { useLists } from "./hooks/useLists";
import axios from "axios";
import classes from "./style.module.css";
import ListItem from "./components/ListItem";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon you want to use

const Prompt = ({ onClose, titleData }) => {
  const { user } = useUser();
  const { lists, titleExists, setTitleExists } = useLists(
    user?.id,
    titleData._id
  );

  console.log("CURRENT titleExists 💥💥💥💥: ", titleExists);

  const addToList = async ({ titleId, listId }) => {
    try {
      const response = await axios.patch(
        `http://localhost:2000/api/v1/lists/update-list`,
        { titleId, listId }
      );

      // Create a new object for titleExists to ensure re-render
      setTitleExists((prevTitleExists) => {
        const updatedTitleExists = {
          ...prevTitleExists,
          [listId]: response.data.exists,
        };
        return updatedTitleExists;
      });
    } catch (err) {
      console.error("Error trying to send the request: ", err);
    }
  };

  useEffect(() => {
    console.log("CURRENT titleExists 🧱 ", titleExists);
  }, [titleExists]);

  return (
    <div className={classes.promptBackdrop}>
      <div className={classes.container}>
        <div className={classes.promptWindow}>
          <div className={classes.header}>
            <img src={titleData.cover} className={classes.cover} />
            <div className={classes.textContainer}>
              <p className={classes.titleName}>{titleData.name}</p>
              <p className={classes.headline}>Add to list</p>
            </div>
          </div>
          <div>
            {lists.map((list) => (
              <ListItem
                key={list._id}
                list={list}
                titleId={titleData._id}
                titleExists={titleExists}
                addToList={addToList}
              />
            ))}
          </div>
        </div>
        <button onClick={onClose} className={classes.closeButton}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default Prompt;
