import classes from "./style.module.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";

const Home = () => {
  const { user } = useUser();
  let navigate = useNavigate();
  const [searchedName, setSearchedName] = useState("");

  useEffect(() => {
    if (user) {
      const checkAndCreateUser = async () => {
        try {
          const checkUserResponse = await fetch(
            `http://localhost:2000/api/v1/user/exists/${user.id}`
          );
          const checkData = await checkUserResponse.json();

          if (!checkData.exists) {
            // USER DOES NOT EXIST, CREATE NEW USER
            const userData = {
              userId: user.id,
              email: user.emailAddresses[0].emailAddress,
              userName: user.username,
            };

            const createUserResponse = await fetch(
              "http://localhost:2000/api/v1/user/signup",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
              }
            );

            if (createUserResponse.ok) {
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

  const handlekeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/details/${searchedName}`);
    }
  };

  return (
    <div>
      <div className={classes.menu}>
        <div className={classes.links}>
          <Link to="" className={classes.link}>
            READLIST
          </Link>
          <Link to="/lists" className={classes.link}>
            LISTS
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
          <input
            type="text"
            placeholder="Search"
            value={searchedName}
            onChange={(event) => setSearchedName(event.target.value)}
            onKeyDown={handlekeyPress}
            className={classes.searchbar}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
