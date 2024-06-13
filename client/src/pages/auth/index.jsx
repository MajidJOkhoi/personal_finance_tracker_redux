import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

const Auth = () => {
  return (
    <div className="flex space-x-4">
      <SignedOut>
        <SignUpButton mode="modal" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200" />
        <SignInButton mode="modal" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Auth;
