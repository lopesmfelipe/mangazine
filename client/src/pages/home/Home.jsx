import classes from "./style.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";

const Home = () => {
  const { user } = useUser();
  let navigate = useNavigate();
  const [searchedName, setSearchedName] = useState("");
  console.log("COMPONENT RENDERED");

  useEffect(() => {
    console.log("COMPONENT RENDERED");
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
  }, [user]);

  const handlekeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/details/${searchedName}`);
    }
  };

  return (
    <>
      <header>
        <div className={classes.menu}>
          <button>Readlist</button>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <main>
        <h1 className={classes.name}>MANGAZINE</h1>
        <h2>Your favorite reads in one place!</h2>
        <div className={classes["searchbar-container"]}>
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
    </>
  );
};

export default Home;
