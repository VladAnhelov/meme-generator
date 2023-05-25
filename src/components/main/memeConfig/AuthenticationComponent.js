import { useState } from "react";
import {
  auth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "../../firebase.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "../../header/NavBarMenu.module.scss";

export default function AuthenticationComponent({ onClose, onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = () => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = () => {
    return password.length >= 6;
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    if (!validateEmail()) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError("");
    }

    if (!validatePassword()) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }

    if (validateEmail() && validatePassword()) {
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        toast.success("Signed in successfully.");

        const userToStore = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        };

        onSignIn(userToStore);
        localStorage.setItem("user", JSON.stringify(userToStore));
        window.location.reload();
        onClose();
      } catch (error) {
        toast.error(`Error signing in: ${error.message}`);
      }
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error(`Error sending password reset email: ${error.message}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.modalContent}>
        <div className={styles.loginForm}>
          <h2 className={styles.modalText}>Sign In</h2>
          <form className={styles.modalFormInput} onSubmit={handleSignIn}>
            <input
              type="email"
              name="email"
              className={`${styles.formControl} ${
                emailError ? styles.error : ""
              }`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <div className={styles.errorMessage}>{emailError}</div>
            )}
            <input
              type="password"
              name="password"
              className={`${styles.formControl} ${
                passwordError ? styles.error : ""
              }`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <div className={styles.errorMessage}>{passwordError}</div>
            )}
            <div className={styles.buttonBlock}>
              <button type="submit" className={styles.submitBtn}>
                Sign In
              </button>
              <button
                type="button"
                className={styles.submitBtn}
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
        <button className={styles.closeButtonModal} onClick={onClose}>
          X
        </button>
      </div>
    </>
  );
}
