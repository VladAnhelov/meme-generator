import React, { useState, useEffect } from "react";
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "../firebase.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import styles from "./NavBarMenu.module.scss";
import AccountModal from "./AccountModal.js";

export default function NavBarMenu() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleCloseSignIn = () => setShowSignIn(false);
  const handleShowSignIn = () => setShowSignIn(true);

  const handleCloseSignUp = () => setShowSignUp(false);
  const handleShowSignUp = () => setShowSignUp(true);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Update user profile with displayName
      await updateProfile(user, { displayName: name });

      // Store user data in Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        createdAt: serverTimestamp(),
      });

      alert("User successfully created.");
      handleCloseSignUp();
    } catch (error) {
      alert(`Error creating user: ${error.message}`);
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in successfully.");
      handleCloseSignIn();
    } catch (error) {
      alert(`Error signing in: ${error.message}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully.");
    } catch (error) {
      alert(`Error signing out: ${error.message}`);
    }
  };

  const handleAuthStateChanged = (user) => {
    if (user) {
      setIsSignedIn(true);
      setUser(user);
    } else {
      setIsSignedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);
    return () => {
      unsubscribe();
    };
  }, []);

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
              <div className={styles.modalContent}>
                <div className={styles.loginForm}>
                  <h2 className={styles.modalText}>Sign In</h2>
                  <form
                    className={styles.modalFormInput}
                    onSubmit={handleSignIn}
                    action=""
                  >
                    <input
                      type="text"
                      name="email"
                      className={styles.formControl}
                      placeholder="Email"
                    ></input>
                    <input
                      type="password"
                      name="password"
                      className={styles.formControl}
                      placeholder="Password"
                    ></input>
                    <button type="submit" className={styles.submitBtn}>
                      Login
                    </button>
                  </form>
                </div>
                <button
                  className={styles.closeButtonModal}
                  onClick={handleCloseSignIn}
                >
                  X
                </button>
              </div>
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
              <div className={styles.modalContent}>
                <div className={styles.loginForm}>
                  <h2 className={styles.modalText}>Sign Up</h2>
                  <form
                    className={styles.modalFormInput}
                    onSubmit={handleSignUp}
                  >
                    <input
                      type="text"
                      name="name"
                      className={styles.formControl}
                      placeholder="Name"
                    ></input>
                    <input
                      type="text"
                      name="email"
                      className={styles.formControl}
                      placeholder="Email"
                    ></input>
                    <input
                      type="password"
                      name="password"
                      className={styles.formControl}
                      placeholder="Password"
                    ></input>
                    <button type="submit" className={styles.submitBtn}>
                      Sign Up
                    </button>
                  </form>
                </div>
                <button
                  className={styles.closeButtonModal}
                  onClick={handleCloseSignUp}
                >
                  X
                </button>
              </div>
            </div>
          </li>
        )}
      </ul>
      {isSignedIn && user && <AccountModal />}
    </div>
  );
}
