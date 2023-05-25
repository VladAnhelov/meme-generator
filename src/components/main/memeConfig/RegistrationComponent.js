import { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  db,
} from "../../firebase.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import styles from "../../header/NavBarMenu.module.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegistrationComponent({ onClose, onSignUp }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(user, { displayName: name });

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        createdAt: serverTimestamp(),
      });

      toast.success("User successfully created.");
      const userToStore = {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
      };

      onSignUp(userToStore);
      localStorage.setItem("user", JSON.stringify(userToStore));
      window.location.reload();
      onClose();
    } catch (error) {
      toast.error(`Error creating user: ${error.message}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.modalContent}>
        <div className={styles.loginForm}>
          <h2 className={styles.modalText}>Sign Up</h2>
          <form className={styles.modalFormInput} onSubmit={handleSignUp}>
            <input
              type="text"
              name="name"
              className={styles.formControl}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Sign Up
            </button>
          </form>
        </div>
        <button className={styles.closeButtonModal} onClick={onClose}>
          X
        </button>
      </div>
    </>
  );
}
