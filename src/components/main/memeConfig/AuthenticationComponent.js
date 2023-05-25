import { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../../firebase.js";
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
    return password.length >= 8;
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
        alert("Signed in successfully.");

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
        alert(`Error signing in: ${error.message}`);
      }
    }
  };

  return (
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
          <button type="submit" className={styles.submitBtn}>
            Sign In
          </button>
        </form>
      </div>
      <button className={styles.closeButtonModal} onClick={onClose}>
        X
      </button>
    </div>
  );
}
