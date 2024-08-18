import classes from "./style.module.css";
import berserk from "./berserk.jpg";

interface ItemData {
  cover: string;
  name: string;
}

interface ScrollbarProps {
  itemData: ItemData;
  itemsNumber: number;
}

const HorizontalScrollbar: React.FC<ScrollbarProps> = ({
  itemData,
  itemsNumber,
}) => {
  // Creatae an array with the given number of items
  const itemsArray = new Array(itemsNumber).fill(null);

  return (
    <>
      <div>
        <div
          className={classes.wrapper}
          style={{ "--itemsNumber": itemsNumber } as React.CSSProperties} // Type assertion to handle CSS custom properties
        >
          {itemsArray.map((_, index) => (
            <div key={index} className={classes.item}>
              <div className={classes.coverContainer}>
                <img src={itemData.cover} />
              </div>
              <div>
                <p>{itemData.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HorizontalScrollbar;
