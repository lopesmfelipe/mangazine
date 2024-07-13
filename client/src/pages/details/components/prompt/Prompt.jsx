import { useEffect, useState } from "react";
import classes from "./style.module.css";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Prompt = ({ onClose, titleData }) => {
  const { user } = useUser();
  const [lists, setLists] = useState([]);

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
                  <div className={classes.box}>
                    <i className="fa-solid fa-plus"></i>
                    <h3 className={classes.listName}>{list.name}</h3>
                  </div>
                  <div className={classes.verticalLineContainer}>
                    <div className={classes.verticalLine}></div>
                  </div>
                  <Link
                    to={`/list/${list._id}`}
                    className={`${classes.noDecoration} ${classes.goToList}`}
                  >
                    <div className={`${classes.noDecoration} ${classes.goToList}`}>
                      <i className={`fa-solid fa-chevron-right`}></i>
                    </div>
                  </Link>
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
