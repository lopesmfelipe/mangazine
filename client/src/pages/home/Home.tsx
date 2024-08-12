import classes from "./style.module.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import Searchbar from "./components/searchbar/Searchbar";
import axios from "axios";

const Home = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const checkAndCreateUser = async () => {
        try {
          const checkUser = await axios.get(
            `http://localhost:2000/api/v1/user/exists/${user.id}`
          );
          const checkData = checkUser.data;

          // USER DOES NOT EXIST, CREATE NEW USER
          if (!checkData.exists) {
            const userData = {
              userId: user.id,
              email: user.emailAddresses[0].emailAddress,
              userName: user.username,
            };

            const createUser = await axios.post(
              "http://localhost:2000/api/v1/user/signup",
              userData
            );

            if (createUser.status === 200) {
              console.log("User created successfully");
            } else {
              console.error("Failed to create user");
            }
          } else {
            console.log("User already exists");
          }
        } catch (err) {
          console.error("Error checking or creating user", err);
        }
      };

      checkAndCreateUser();
    }

    document.body.classList.add(classes.bodyStyle);

    return () => {
      document.body.classList.remove(classes.bodyStyle);
    };
  }, [user]);

  return (
    <div>
      <div className={classes.menu}>
        <h1>MANGAZINE</h1>
        <div className={classes.links}>
          <Link to="" className={classes.link}>
            READLIST
          </Link>
          <Link to="/lists" className={classes.link}>
            LISTS
          </Link>
          <Link to="/about" className={classes.link}>
            ABOUT
          </Link>
        </div>
        <SignedIn>
          <div className={classes.userButton}>
            <UserButton />
          </div>
        </SignedIn>
      </div>
      <main>
        <h1 className={classes.name}>MANGAZINE</h1>
        <h2>Your favorite reads in one place!</h2>
        <div>
          <Searchbar />
        </div>
      </main>
    </div>
  );
};

export default Home;
