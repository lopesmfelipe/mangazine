import classes from "./style.module.css";

const ScrollbarTest = () => {
  return (
    <div className={classes.container}>
      <h1>SCROLLBAR</h1>
      <div className={classes.stockTicker}>
        <ul>
          <li className={classes.minus}>
            <span className={classes.company}>AAPL</span>
            <span className={classes.company}>AMAZON</span>
            <span className={classes.company}>MICROSOFT</span>
          </li>
          <li className={classes.plus}>
            <span className={classes.company}>AAPL</span>
            <span className={classes.company}>AMAZON</span>
            <span className={classes.company}>MICROSOFT</span>
          </li>
          <li className={classes.plus}>
            <span className={classes.company}>AAPL</span>
            <span className={classes.company}>AMAZON</span>
            <span className={classes.company}>MICROSOFT</span>
          </li>
        </ul>
        <ul aria-hidden="true">
          <li className={classes.minus}>
            <span className={classes.company}>AAPL</span>
            <span className={classes.company}>AMAZON</span>
            <span className={classes.company}>MICROSOFT</span>
          </li>
          <li className={classes.plus}>
            <span className={classes.company}>AAPL</span>
            <span className={classes.company}>AMAZON</span>
            <span className={classes.company}>MICROSOFT</span>
          </li>
          <li className={classes.plus}>
            <span className={classes.company}>AAPL</span>
            <span className={classes.company}>AMAZON</span>
            <span className={classes.company}>MICROSOFT</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ScrollbarTest;
