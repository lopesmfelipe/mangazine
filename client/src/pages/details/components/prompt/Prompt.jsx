import { useEffect, useState } from "react";
import classes from "./style.module.css";

const Prompt = ({ onClose }) => {
  const { user } = useUser();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const getLists = async () => {
      try {
        const 
      } catch (err) {

      }
    }
  }, [])

  return (
    <div className={classes.promptBackdrop}>
      <div className={classes.promptWindow}>
        <h2>Title</h2>
        <p>This is a prompt message</p>
        <button onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default Prompt;
