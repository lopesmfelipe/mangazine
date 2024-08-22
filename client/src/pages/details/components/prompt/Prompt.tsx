import { useUser } from "@clerk/clerk-react";
import { useLists } from "./hooks/useLists";
import axios from "axios";
import classes from "./style.module.css";
import ListItem from "./components/ListItem";
import { useEffect } from "react";

const Prompt = ({ onClose, titleData }) => {
  const { user } = useUser();
  const { lists, titleExists, setTitleExists } = useLists(
    user?.id,
    titleData._id
  );

  const addToList = async ({ titleId, listId }) => {
    try {
      const response = await axios.patch(
        `http://localhost:2000/api/v1/lists/${listId}/add-to-list/${titleId}`,
        { titleId, listId }
      );

      // Create a new object for titleExists to ensure re-render
      setTitleExists((prevTitleExists) => ({
        ...prevTitleExists,
        [listId]: response.data.exists,
      }));
    } catch (error) {
      console.error("Error trying to add item: ", error);
    }
  };

  const removeFromList = async ({ titleId, listId }) => {
    try {
      const response = await axios.patch(
        `${titleId}/remove-from-list/${listId}`
      );
      setTitleExists((prevTitleExists) => ({
        ...prevTitleExists,
        [listId]: false,
      }));
    } catch (error) {
      console.error("Error removing item from the list:", error);
    }
  };

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
                removeFromList={removeFromList}
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
