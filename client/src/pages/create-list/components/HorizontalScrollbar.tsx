import classes from './style.module.css';

const HorizontalScrollbar = () => {
  return (
    <div>
      <div className={classes.wrapper}>
        <div className={`${classes.item} ${classes.item1}` }></div>
        <div className={`${classes.item} ${classes.item2}` }></div>
        <div className={`${classes.item} ${classes.item3}` }></div>
        <div className={`${classes.item} ${classes.item4}` }></div>
        <div className={`${classes.item} ${classes.item5}` }></div>
        <div className={`${classes.item} ${classes.item5}` }></div>
        <div className={`${classes.item} ${classes.item6}` }></div>
        <div className={`${classes.item} ${classes.item7}` }></div>
        <div className={`${classes.item} ${classes.item8}` }></div>
        <div className={`${classes.item} ${classes.item9}` }></div>
      </div>
    </div>
  );
};

export default HorizontalScrollbar;
