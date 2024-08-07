import classes from "./style.module.css";
import { NavLink } from "react-router-dom";
import { SignedIn, UserButton } from "@clerk/clerk-react";

const Header = () => {
  return (
    <div className={classes.menu}>
      <h1>MANGAZINE</h1>
      <div className={classes.links}>
        <SignedIn>
          <div className={classes.userButton}>
            <UserButton />
          </div>
        </SignedIn>
        <NavLink
          to="/about"
          className={classes.link}
          activeClassName={classes.activeLink}
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/home"
          className={classes.link}
          activeClassName={classes.activeLink}
        >
          HOME
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
