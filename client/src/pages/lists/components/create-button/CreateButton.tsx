import classess from "./style.module.css";
import { Link } from "react-router-dom";

const CreateButton = () => {
  return (
    <div className={classess.container}>
      <div className={classess.buttonContainer}>
        <Link to="/create-list">
          <button className={classess.createList}>
            <div>
              <i className="fa-solid fa-plus"></i>
              CREATE LIST
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CreateButton;
