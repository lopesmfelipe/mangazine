import classes from "./auth.module.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

import { Navigate } from "react-router-dom";

export const Auth = () => {
  return (
    <div className={classes["sign-in-container"]}>
      <SignedOut>
        <SignUpButton mode="modal" />
        <SignInButton mode="modal" />
      </SignedOut>

      <SignedIn>
        <div className={classes["test"]}>
          <UserButton />
        </div>
        <Navigate to="/home" />
      </SignedIn>
    </div>
  );
};
