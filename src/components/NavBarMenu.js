import React, { useState, useEffect } from "react";
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "./firebase.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function NavBarMenu() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleCloseSignIn = () => setShowSignIn(false);
  const handleShowSignIn = () => setShowSignIn(true);

  const handleCloseSignUp = () => setShowSignUp(false);
  const handleShowSignUp = () => setShowSignUp(true);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Store user data in Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
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
    } else {
      setIsSignedIn(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="navbar">
      <ul className="navbar__menu">
        {!isSignedIn && (
          <li className="navbar__menu-item">
            <button
              className="navbar__menu-link sign-in"
              onClick={handleShowSignIn}
            >
              Sign In
            </button>
            <div className={`modal${showSignIn ? " show" : ""}`}>
              <div className="modal-content">
                <div className="login-form">
                  <h2 className="modal--text">Sign In</h2>
                  <form
                    className="modal--form--input"
                    onSubmit={handleSignIn}
                    action=""
                  >
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                    ></input>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                    ></input>
                    <button type="submit" className="submit-btn">
                      Login
                    </button>
                  </form>
                </div>
                <button
                  className="close--button--modal"
                  onClick={handleCloseSignIn}
                >
                  X
                </button>
              </div>
            </div>
          </li>
        )}
        {!isSignedIn && (
          <li className="navbar__menu-item">
            <button className="navbar__menu-link" onClick={handleShowSignUp}>
              Sign Up
            </button>
            <div className={`modal${showSignUp ? " show" : ""}`}>
              <div className="modal-content">
                <div className="login-form">
                  <h2 className="modal--text">Sign Up</h2>
                  <form className="modal--form--input" onSubmit={handleSignUp}>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                    ></input>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                    ></input>
                    <button type="submit" className="submit-btn">
                      Sign Up
                    </button>
                  </form>
                </div>
                <button
                  className="close--button--modal"
                  onClick={handleCloseSignUp}
                >
                  X
                </button>
              </div>
            </div>
          </li>
        )}
        {isSignedIn && (
          <li className="navbar__menu-item">
            <button
              className="navbar__menu-link sign-out"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
