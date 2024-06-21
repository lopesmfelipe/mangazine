import styles from "./addToReadlist.module.css";

const AddToReadlist = () => {
  return (
    <div>
      <button className={styles.addButton1}>
        <div>
          <i className="fa-solid fa-plus"></i>
          Add to Readlist
        </div>
      </button>
      <button className={styles.addButton2}>
        <div>
        <i class="fa-solid fa-angle-down"></i>
        </div>
      </button>
    </div>
  );
};

export default AddToReadlist;
