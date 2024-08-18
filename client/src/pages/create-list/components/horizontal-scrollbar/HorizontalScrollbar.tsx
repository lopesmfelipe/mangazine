import classes from "./style.module.css";
import berserk from "./berserk.jpg";

interface Item {
  _id: string;
  cover: string;
  name: string;
}

interface ScrollbarProps {
  items: Item[];
  itemsNumber: number;
}

const HorizontalScrollbar: React.FC<ScrollbarProps> = ({
  items,
  itemsNumber,
}) => {
  return (
    <>
      <div>
        <div
          className={classes.wrapper}
          style={{ "--itemsNumber": itemsNumber } as React.CSSProperties} // Type assertion to handle CSS custom properties
        >
          {items.map((item) => (
            <div key={item._id} className={classes.item}>
              <div className={classes.coverContainer}>
                <img src={item.cover} />
              </div>
              <div>
                <p>{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HorizontalScrollbar;
