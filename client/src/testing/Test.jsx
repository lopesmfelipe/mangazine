import { useEffect } from "react";
import classes from "./style.module.css";

const Test = () => {
  useEffect(() => {
    document.body.classList.add(classes.bodyStyle);

    return () => {
      document.body.classList.remove(classes.bodyStyle);
    };
  }, []);

  return (
    <div className={classes.container}>
      <div className={`${classes.item} ${classes.item1}`}>ITEM 1</div>
      <div className={`${classes.item} ${classes.item2}`}>ITEM 2</div>
      <div className={`${classes.item} ${classes.item3}`}>ITEM 3</div>
    </div>
  );
};

export default Test;
