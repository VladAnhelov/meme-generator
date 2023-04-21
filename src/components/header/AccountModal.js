import React from "react";
import { auth, signOut } from "../firebase.js";
import styles from "./AccountModal.module.scss";
import button from "./NavBarMenu.module.scss";

export default function AccountModal() {
  const [click, setClick] = React.useState(false);
  const [showAccountMenu, setShowAccountMenu] = React.useState(false);

  const handleClick = () => {
    if (!click) {
      setShowAccountMenu(true);
      setClick(true);
      console.log(click, "click");
    } else {
      setShowAccountMenu(false);
      setClick(false);
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

  return (
    <div className={styles.block}>
      <img
        className={styles.account_icon}
        src="https://img.icons8.com/fluency/96/null/doge.png"
        alt=""
        onClick={handleClick}
      />
      <div
        className={`${styles.account_smallMenu} ${
          showAccountMenu ? `${styles.show}` : ""
        }`}
      >
        <div className={styles.block_textItem}>
          <p>Account Menu</p>
        </div>
        <div className={styles.block_buttomItem}>
          <button
            onClick={handleSignOut}
            className={`${button.navbarMenuLink} ${button.signOut}`}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
