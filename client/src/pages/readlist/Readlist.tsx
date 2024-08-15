import classes from "./style.module.css";
import Header from "../../components/header/Header";
import ElementCard from "../../components/element-card/ElementCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const Readlist = () => {
  const { isSignedIn, user } = useUser();
  const [readList, setReadList] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:2000/api/v1/user/readlist/${user.id}`
          );
          setReadList(response.data.data.readList);
          console.log(readList);
        } catch (err) {
          console.error(`Failed to fetch Readlist. Error message: ${err}`);
        }
      }
    };
    fetchItems();
  }, [user]);

  return (
    <div className={classes.container}>
      <Header />

      <main className={classes.contentGrid}>
        {readList.map((element, index) => (
          <ElementCard key={index} element={element} />
        ))}
      </main>
    </div>
  );
};

export default Readlist;
