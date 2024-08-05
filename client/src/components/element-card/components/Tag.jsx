import { useEffect, useState } from "react";
import classes from "./style.module.css";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Tag = ({ userId, titleId }) => {
  const [isOnReadlist, setIsOnReadlist] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const checkItemExists = async () => {
      console.log(userId, titleId);

      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/user/readlist/${userId}/check-item-exists/${titleId}`
        );

        console.log("Item exists: ", response);
        setIsOnReadlist(response.data.exists);
      } catch (err) {
        console.error(err);
      }
    };

    checkItemExists();
  }, [userId, titleId]);

  const addOrRemoveItem = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (!isOnReadlist) {
      try {
        const response = await axios.patch(
          `http://localhost:2000/api/v1/user/readlist/${userId}/add-to-readlist/${titleId}`
        );
        console.log(response);
        setIsOnReadlist(true); // Update state to reflect item added
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const response = await axios.delete(
          `http://localhost:2000/api/v1/user/readlist/${userId}/remove-from-readlist/${titleId}`
        );
        console.log(response);
        setIsOnReadlist(false); // Update state to reflect item removed
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (isOnReadlist) {
    return (
      <span
        className={`material-icons ${classes.addedIcon}`}
        onClick={addOrRemoveItem}
      >
        bookmark_added
      </span>
    );
  }

  return (
    <span
      className={`material-icons ${classes.addIcon}`}
      onClick={addOrRemoveItem}
    >
      bookmark_add
    </span>
  );
};

export default Tag;
