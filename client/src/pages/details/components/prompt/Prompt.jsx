import { useEffect, useState } from "react";
import classes from "./style.module.css";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Prompt = ({ onClose, titleData }) => {
  const { user } = useUser();
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  const goToList = (listId) => {
    navigate(`/list/${listId}`);
  };

  const addToList = async ({ titleId, listId }) => {
    try {
      const response = await axios.patch(
        `http://localhost:2000/api/v1/lists/update-list`,
        { titleId, listId }
      );

      console.log(response.data.message);
    } catch (err) {
      console.error("ERROR TRYING TO SEND THE REQUEST: ", err);
    }
  };

  const checkTitleExists = async (listId) => {
    try {
      const response = await axios.get(
        `http://localhost:2000/api/v1/user/lists/${listId}/titles/${titleData._id}/exists`
      );

      console.log("RESULT IF THE TITLE IS ALREADY IN THE LIST: ", response);
      return response.data.exists;
    } catch (err) {
      console.error("Error trying to check if title is in the list ", err);
      return;
    }
  };

  useEffect(() => {
    if (!user || !user.id) {
      return;
    }

    const getLists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/user/lists/${user.id}`
        );
        setLists(response.data.data.lists);
        console.log(lists);
      } catch (err) {
        console.error("Error fetching lists: ", err);
      }
    };

    getLists();
  }, [user]);

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
            {lists.map((list, index) => (
              <div className={classes.listsContainer} key={index}>
                <div
                  className={classes.box}
                  onClick={() =>
                    addToList({ titleId: titleData._id, listId: list._id })
                  }
                >
                  {checkTitleExists(list._id) ? (
                    <i className="fa-solid fa-check"></i>
                  ) : (
                    <i className="fa-solid fa-plus"></i>
                  )}

                  <h3 className={classes.listName}>{list.name}</h3>
                </div>
                <div className={classes.verticalLineContainer}>
                  <div className={classes.verticalLine}></div>
                </div>
                <div
                  className={classes.goToList}
                  onClick={() => goToList(list._id)}
                >
                  <i className={`fa-solid fa-chevron-right`}></i>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default Prompt;
