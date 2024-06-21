import classess from "./buttonReadlist.module.css";

const ButtonReadlist = () => {
  return (
    <div className={classess.container}>
      <button className={classess["add-to-readlist-1"]}>
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
