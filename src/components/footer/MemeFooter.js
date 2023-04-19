import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./MemeFooter.module.scss";

export default function MemeFooter(second) {
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.3)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };
  return (
    <footer className={styles.footer}>
      <p className={styles.socialText}>Get in touch:</p>
      <div className={styles.socialIcons}>
        <a
          href="https://www.facebook.com/vladanhelov"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.icon} ${styles.icon_facebook}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a
          href="https://t.me/sumne_hivno"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.icon} ${styles.icon_telegram}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faTelegram} />
        </a>
        <a
          href="https://www.linkedin.com/in/vladanhelov/"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.icon} ${styles.icon_linkedin}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      </div>
    </footer>
  );
}
