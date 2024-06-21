import classess from "./addToReadlist.module.css";

const AddToReadlist = () => {
  return (
    <div>
      <button className={classess.addButton1}>
        <div>
          <i className="fa-solid fa-plus"></i>
          Add to Readlist
        </div>
      </button>
      <button className={classess.addButton2}>
        <div>
        <i className="fa-solid fa-angle-down"></i>
        </div>
      </button>
    </div>
  );
};

export default AddToReadlist;
