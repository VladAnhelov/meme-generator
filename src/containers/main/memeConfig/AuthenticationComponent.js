import { useState, useRef, useEffect } from "react";
import {
  auth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithGoogle,
} from "../../../services/firebase.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import anime from "animejs/lib/anime.es.js";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import styles from "../../../components/header/NavBarMenu.module.scss";

export default function AuthenticationComponent({ onClose, onSignIn, show }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const modalRef = useRef(null);

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      toast.success("Signed in with Google successfully.");

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
      toast.error(`Error signing in with Google: ${error.message}`);
    }
  };

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

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
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
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error(`Error sending password reset email: ${error.message}`);
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  const responseFacebook = (response) => {
    console.log(response);
    // Here you can handle the response from Facebook
    // You can store the user data in your state or in your database
  };

  return (
    <>
      <ToastContainer />
      {show && (
        <div ref={modalRef} className={styles.modalContent}>
          <div className={styles.loginForm}>
            <h2 className={styles.modalText}>Sign In</h2>
            <div className={styles.modalContentBlock}>
              <div className={styles.modalContentImage}>
                <img src="https://i.ibb.co/Lz894X3/will.png" alt="will" />
              </div>
              <div className={styles.modalContentForm}>
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
                      className={styles.resetBtn}
                      onClick={handleResetPassword}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <span className={styles.textChooseAuth}>OR</span>
                  <div className={styles.authBlock}>
                    <button
                      type="button"
                      className={styles.googleButton}
                      onClick={handleSignInWithGoogle}
                    >
                      <img
                        className={styles.googleIcon}
                        alt=""
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      />
                    </button>
                    <FacebookLogin
                      appId="996556911365606"
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={responseFacebook}
                      render={(renderProps) => (
                        <button
                          type="button"
                          className={styles.googleButton}
                          onClick={renderProps.onClick}
                        >
                          <svg
                            width="25"
                            height="25"
                            viewBox="88.428 12.828 107.543 207.085"
                            id="facebook"
                          >
                            <path
                              fill="#3c5a9a"
                              d="M158.232 219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658 
              2.96-17.922 18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106 0-47.348 
              17.155-47.348 48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z"
                            ></path>
                          </svg>
                        </button>
                      )}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <button className={styles.closeButtonModal} onClick={handleClose}>
            X
          </button>
        </div>
      )}
    </>
  );
}
