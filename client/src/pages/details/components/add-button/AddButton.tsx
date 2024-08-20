import { useUser } from "@clerk/clerk-react";
import Axios from "axios";
import classess from "./style.module.css";
import { useState } from "react";
import Prompt from "../prompt/Prompt";

const AddButton = ({ titleData }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const { user } = useUser();

  const userId = user?.id;
  const titleId = titleData._id;

  const handleAddToReadlist = async () => {
    try {
      const response = await Axios.patch(
        `http://localhost:2000/api/v1/user/readlist/${userId}/add-to-readlist/${titleId}`
      );
      console.log(response);
    } catch (err) {
      console.error("Error trying to send the request ", err);
    }
  };

  const handleButton2Click = () => {
    setShowPrompt(true);
  };

  const handleClose = () => {
    setShowPrompt(false);
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
      <button
        onClick={handleButton2Click}
        className={classess["add-to-readlist-2"]}
      >
        <div>
          <i className="fa-solid fa-angle-down"></i>
        </div>
      </button>
      {showPrompt && <Prompt onClose={handleClose} titleData={titleData} />}
    </div>
  );
};

export default AddButton;
