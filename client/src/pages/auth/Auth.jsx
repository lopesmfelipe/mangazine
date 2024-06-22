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

  // Function to handle signup success
  const handleSignUpSuccess = async = (user) => {
    const { userName, email, id } = user.details;

    try {
      // Send user data to backend
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          email: email,
          userId: id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user')
      }

      console.log('Sucess! This is the response' + response);
    } catch (err) {
      console.error('Error creating user: ', err);
    }

  }

  return (
    <div className={classes["sign-in-container"]}>
      <SignedOut>
        <SignUpButton mode="modal" onSuccess={handleSignUpSuccess} />
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
