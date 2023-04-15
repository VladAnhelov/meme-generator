import React, { useState } from "react";

export default function NavBarMenu() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleCloseSignIn = () => setShowSignIn(false);
  const handleShowSignIn = () => setShowSignIn(true);

  const handleCloseSignUp = () => setShowSignUp(false);
  const handleShowSignUp = () => setShowSignUp(true);

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
