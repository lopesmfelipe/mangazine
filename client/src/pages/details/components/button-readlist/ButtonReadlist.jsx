import { Axios } from "axios";
import classess from "./buttonReadlist.module.css";

const ButtonReadlist = (id) => {

  const handleAddToReadlist = (id) => {
    const response = await Axios.patch(`localhost:2000/api/v1/user/update-readlist/${id}`);
  }

  return (
    <div className={classess.container}>
      <button onClick={handleAddToReadlist} className={classess["add-to-readlist-1"]}>
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
