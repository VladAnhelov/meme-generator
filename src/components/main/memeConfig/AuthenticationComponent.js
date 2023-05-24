import { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../../firebase.js";
import styles from "../../header/NavBarMenu.module.scss";

export default function AuthenticationComponent({ onClose, onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in successfully.");

      const userToStore = {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
      };

      onSignIn(userToStore);
      localStorage.setItem("user", JSON.stringify(userToStore));

      onClose();
    } catch (error) {
      alert(`Error signing in: ${error.message}`);
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
            className={styles.formControl}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            className={styles.formControl}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
