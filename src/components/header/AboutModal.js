import React, { useRef, useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import style from "./AboutModal.module.scss";

export default function AboutModal({ show, onClose }) {
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

  return (
    <div className={style.aboutBlock} ref={modalRef} data-testid="modal">
      <p data-testid="modal-description">
        Hello, guys! This site is my project where I want to improve my skills
        in front-end development and QA!
      </p>

      {/* Checkbox for automation */}
      <div>
        <label htmlFor="accept-terms" data-testid="checkbox-label">
          Accept Terms and Conditions:
        </label>
        <input type="checkbox" id="accept-terms" data-testid="checkbox" />
      </div>

      {/* Text input for automation */}
      <div>
        <label htmlFor="name-input" data-testid="input-label">
          Enter your name:
        </label>
        <input
          type="text"
          id="name-input"
          placeholder="Your Name"
          data-testid="text-input"
        />
      </div>

      {/* Dropdown for automation */}
      <div>
        <label htmlFor="color-select" data-testid="dropdown-label">
          Select a color:
        </label>
        <select id="color-select" data-testid="dropdown">
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
      </div>

      {/* Button to close the modal */}
      <button
        className={style.close_btn}
        onClick={handleClose}
        data-testid="close-button"
      >
        X
      </button>
    </div>
  );
}
