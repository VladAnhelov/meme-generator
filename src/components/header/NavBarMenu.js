import React, { useState } from "react";

import styles from "./NavBarMenu.module.scss";
import AuthenticationComponent from "../main/memeConfig/AuthenticationComponent.js";
import RegistrationComponent from "../main/memeConfig/RegistrationComponent.js";
import AccountModal from "./AccountModal.js";

export default function NavBarMenu() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );
  const [isSignedIn, setIsSignedIn] = useState(user != null);

  const handleCloseSignIn = () => setShowSignIn(false);
  const handleShowSignIn = () => setShowSignIn(true);

  const handleCloseSignUp = () => setShowSignUp(false);
  const handleShowSignUp = () => setShowSignUp(true);

  // Inside AuthenticationComponent and RegistrationComponent
  const handleSignIn = (user) => {
    console.log("Signing in with user", user); // Debug output
    setIsSignedIn(true);
    setUser(user);
    setShowSignIn(false);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleSignUp = (user) => {
    console.log("Signing up with user", user); // Debug output
    setIsSignedIn(true);
    setUser(user);
    setShowSignUp(false);
    localStorage.setItem("user", JSON.stringify(user));
  };
  return (
    <div className={styles.navbar}>
      <ul className={styles.navbarMenu}>
        {!isSignedIn && (
          <li className={styles.navbarMenuItem}>
            <button
              className={`${styles.navbarMenuLink} ${styles.signIn}`}
              onClick={handleShowSignIn}
            >
              Sign In
            </button>
            <div
              className={`${styles.modal} ${
                showSignIn ? `${styles.show}` : ""
              }`}
            >
              {" "}
              <AuthenticationComponent
                onClose={handleCloseSignIn}
                onSignIn={handleSignIn}
              />
            </div>
          </li>
        )}
        {!isSignedIn && (
          <li className={styles.navbarMenuItem}>
            <button
              className={styles.navbarMenuLink}
              onClick={handleShowSignUp}
            >
              Sign Up
            </button>
            <div
              className={`${styles.modal} ${
                showSignUp ? `${styles.show}` : ""
              }`}
            >
              <RegistrationComponent
                onClose={handleCloseSignUp}
                onSignUp={handleSignUp}
              />
            </div>
          </li>
        )}
      </ul>
      {isSignedIn && user && (
        <>
          <AccountModal />
        </>
      )}
    </div>
  );
}
