import classes from "./style.module.css";

const Test = () => {
  return (
    <div className={classes.container}>
      <div className={(classes.item, classes.item1)}></div>
      <div className={(classes.item, classes.item2)}></div>
      <div className={(classes.item, classes.item3)}></div>
    </div>
  );
};

export default Test;
