import { useState } from "react";
import classes from "./style.module.css";

const ScrollbarTest = () => {
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  return (
    <div className={classes.container}>
      <div className={classes.scrollContainer}>
        {items.map((item, index) => (
          <div key={index} className={classes.item}>
            {item}
          </div>
        ))}
      </div>
      <button className={classes.addButton} onClick={addItem}>
        Add New Content
      </button>
    </div>
  );
};
export default ScrollbarTest;
