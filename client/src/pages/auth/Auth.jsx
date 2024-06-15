import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

import "./auth.css";
import { Navigate } from "react-router-dom";

export const Auth = () => {
  return (
    <div className="sign-in-container">
      <SignedOut>
        <SignUpButton mode="modal" />
        <SignInButton mode="modal" />
      </SignedOut>

      <SignedIn>
        <div className="test">
          <UserButton />

        </div>
        <Navigate to="/home" />
      </SignedIn>
    </div>
  );
};
