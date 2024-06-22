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

  const handleSignUpSuccess = async (user) => {
    const { username, email, id } = user;

    try {
      // Send user data to backend
      const response = await fetch("http://localhost:2000/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          email: email,
          userId: id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      console.log("Sucess! This is the response" + response);
    } catch (err) {
      console.error("Error creating user: ", err);
    }
  };

  return (
    <div className={classes["sign-in-container"]}>
      <SignedOut>
        <SignUpButton mode="modal" afterSignUp={handleSignUpSuccess} />
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
