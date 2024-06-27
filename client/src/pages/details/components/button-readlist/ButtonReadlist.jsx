import { useUser } from "@clerk/clerk-react";
import Axios from "axios";
import classess from "./buttonReadlist.module.css";

const ButtonReadlist = ({ titleId }) => {
  const { user } = useUser();

  const handleAddToReadlist = async () => {
    try {
      const response = await Axios.patch(
        `http://localhost:2000/api/v1/user/update-readlist`,
        {
          titleId: titleId,
          userId: user.id,
        }
      );

      if (response.status === 200) {
        console.log("READLIST UPDATED SUCCESSFULLY", response);
      } else {
        console.log("FAIL TO UPDATE READLIST", response);
      }
    } catch (err) {
      console.log("ERROR TRYING TO SEND THE REQUEST ", err);
    }
  };

  return (
    <div className={classess.container}>
      <button
        onClick={handleAddToReadlist}
        className={classess["add-to-readlist-1"]}
      >
        <div>
          <i className="fa-solid fa-plus"></i>
          Add to Readlist
        </div>
      </button>
      <button className={classess["add-to-readlist-2"]}>
        <div>
          <i className="fa-solid fa-angle-down"></i>
        </div>
      </button>
    </div>
  );
};

export default ButtonReadlist;
