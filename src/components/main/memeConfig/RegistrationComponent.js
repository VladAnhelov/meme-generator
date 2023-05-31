import { useState, useRef, useEffect } from "react";
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
import anime from "animejs/lib/anime.es.js";

export default function RegistrationComponent({ onClose, onSignUp, show }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL] = useState("");

  const modalRef = useRef(null);

  useEffect(() => {
    if (show) {
      anime({
        targets: modalRef.current,
        translateY: [-100, -15],
        translateX: [100, 5],
        scale: [0.1, 1],
        opacity: [0, 1],
        duration: 800,
        easing: "easeOutElastic(1, .5)",
      });
    }
  }, [show]);

  const handleClose = () => {
    anime({
      targets: modalRef.current,
      translateY: [-15, -100],
      translateX: [5, 100],
      scale: [1, 0.1],
      opacity: [1, 0],
      duration: 300,
      easing: "easeInExpo",
      complete: onClose, // set showAboutModal to false after animation finishes
    });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(user, { displayName: name });

      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: photoURL,
        createdAt: serverTimestamp(),
      };

      const userRef = await addDoc(collection(db, "users"), userData);
      const newUser = { ...userData, id: userRef.id };

      toast.success("User successfully created.");

      onSignUp(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      window.location.reload();
      onClose();
      console.log(userData);
    } catch (error) {
      toast.error(`Error creating user: ${error.message}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <div ref={modalRef} className={styles.modalContent}>
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
        <button className={styles.closeButtonModal} onClick={handleClose}>
          X
        </button>
      </div>
    </>
  );
}
