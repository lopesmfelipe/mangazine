import { useEffect } from "react";
import classes from "./style.module.css";
import { useNavigate } from "react-router-dom";

const ListItem = ({ list, titleId, titleExists, addToList }) => {
  const navigate = useNavigate();

  const goToList = (listId) => {
    navigate(`/list/${listId}`);
  };

  useEffect(() => {
    console.log(`Title exists for ${list._id}: ${titleExists[list._id]}`);
  }, [titleExists, list._id]);

  return (
    <div className={classes.listsContainer}>
      <div
        className={classes.box}
        onClick={() => addToList({ titleId, listId: list._id })}
      >
        {titleExists[list._id] ? (
          <i className="fa-solid fa-check"></i>
        ) : (
          <i className="fa-solid fa-plus"></i>
        )}
        <h3 className={classes.listName}>{list.name}</h3>
      </div>
      <div className={classes.verticalLineContainer}>
        <div className={classes.verticalLine}></div>
      </div>
      <div className={classes.goToList} onClick={() => goToList(list._id)}>
        <i className={`fa-solid fa-chevron-right`}></i>
      </div>
    </div>
  );
};

export default ListItem;
