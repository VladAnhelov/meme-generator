import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

export default function MemeFooter(second) {
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.3)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };
  return (
    <footer className="footer">
      <p className="social--text">Get in touch:</p>
      <div className="social-icons">
        <a
          href="https://www.facebook.com/vladanhelov"
          target="_blank"
          rel="noopener noreferrer"
          className="icon facebook"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a
          href="https://t.me/sumne_hivno"
          target="_blank"
          rel="noopener noreferrer"
          className="icon telegram"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faTelegram} />
        </a>
        <a
          href="https://www.linkedin.com/in/vladanhelov/"
          target="_blank"
          rel="noopener noreferrer"
          className="icon linkedin"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      </div>
    </footer>
  );
}
