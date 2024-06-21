import classes from "./home.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignedIn, UserButton } from "@clerk/clerk-react";

const Home = () => {
  const [searchedName, setSearchedName] = useState("");
  let navigate = useNavigate();

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
