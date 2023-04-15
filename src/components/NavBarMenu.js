import React, { useState } from "react";
import { auth, db, createUserWithEmailAndPassword } from "./firebase.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function NavBarMenu() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

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
      console.log(`Error creating user: ${error.message}`);
    }
  };

  return (
    <div className="navbar">
      <ul className="navbar__menu">
        <li className="navbar__menu-item">
          <button className="navbar__menu-link" onClick={handleShowSignIn}>
            Sign In
          </button>
          {showSignIn && (
            <div className="modal">
              <div className="modal-content">
                <div className="login-form">
                  <h2 className="modal--text">Sign In</h2>
                  <form className="modal--form--input" action="">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                    ></input>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    ></input>
                    <button type="button" className="submit-btn">
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
          )}
        </li>
        <li className="navbar__menu-item">
          <button className="navbar__menu-link" onClick={handleShowSignUp}>
            Sign Up
          </button>
          {showSignUp && (
            <div className="modal">
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
          )}
        </li>
      </ul>
    </div>
  );
}
