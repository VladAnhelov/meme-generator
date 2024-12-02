import React, { useRef, useEffect, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import style from "./AboutModal.module.scss";

export default function AboutModal({ show, onClose }) {
  const modalRef = useRef(null);

  const [isSwitchOn, setIsSwitchOn] = useState(() => {
    return JSON.parse(localStorage.getItem("switchState")) || false;
  });

  const [formData, setFormData] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("formData")) || {
        checkbox: false,
        textInput: "",
        dropdown: "red",
        radio: "dog",
        volume: 50,
        feedback: "",
      }
    );
  });

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
      complete: onClose,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("switchState", JSON.stringify(isSwitchOn));
    alert("Your preferences have been saved!");
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
  }, []);

  return (
    <div className={style.aboutBlock} ref={modalRef} data-testid="modal">
      <p data-testid="modal-description">
        Hello, guys! This site is my project where I want to improve my skills
        in front-end development and QA!
      </p>

      {/* Checkbox */}
      <div>
        <label htmlFor="accept-terms" data-testid="checkbox-label">
          Accept Terms and Conditions:
        </label>
        <input
          type="checkbox"
          id="accept-terms"
          name="checkbox"
          checked={formData.checkbox}
          onChange={handleInputChange}
          data-testid="checkbox"
        />
      </div>

      {/* Switcher */}
      <div>
        <label htmlFor="switch" data-testid="switch-label">
          Enable notifications:
        </label>
        <input
          type="checkbox"
          id="switch"
          checked={isSwitchOn}
          onChange={(e) => setIsSwitchOn(e.target.checked)}
          data-testid="switch"
        />
      </div>

      {/* Text Input */}
      <div>
        <label htmlFor="name-input" data-testid="input-label">
          Enter your name:
        </label>
        <input
          type="text"
          id="name-input"
          name="textInput"
          value={formData.textInput}
          onChange={handleInputChange}
          placeholder="Your Name"
          data-testid="text-input"
        />
      </div>

      {/* Dropdown */}
      <div>
        <label htmlFor="color-select" data-testid="dropdown-label">
          Select a color:
        </label>
        <select
          id="color-select"
          name="dropdown"
          value={formData.dropdown}
          onChange={handleInputChange}
          data-testid="dropdown"
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
      </div>

      {/* Radio Buttons */}
      <div>
        <fieldset data-testid="radio-group">
          <legend>Choose your favorite pet:</legend>
          <label>
            <input
              type="radio"
              name="radio"
              value="dog"
              checked={formData.radio === "dog"}
              onChange={handleInputChange}
              data-testid="radio-dog"
            />
            Dog
          </label>
          <label>
            <input
              type="radio"
              name="radio"
              value="cat"
              checked={formData.radio === "cat"}
              onChange={handleInputChange}
              data-testid="radio-cat"
            />
            Cat
          </label>
        </fieldset>
      </div>

      {/* Slider */}
      <div>
        <label htmlFor="volume-slider" data-testid="slider-label">
          Volume:
        </label>
        <input
          type="range"
          id="volume-slider"
          name="volume"
          min="0"
          max="100"
          value={formData.volume}
          onChange={handleInputChange}
          data-testid="slider"
        />
        <span data-testid="slider-value">{formData.volume}</span>
      </div>

      {/* Text Area */}
      <div>
        <label htmlFor="feedback" data-testid="textarea-label">
          Your feedback:
        </label>
        <textarea
          id="feedback"
          name="feedback"
          placeholder="Write your feedback here..."
          rows="4"
          value={formData.feedback}
          onChange={handleInputChange}
          data-testid="textarea"
        />
      </div>

      {/* Save Button */}
      <div className={style.block_save_btn}>
        <button
          className={style.save_btn}
          type="button"
          onClick={handleSave}
          data-testid="save-button"
        >
          Save
        </button>
      </div>

      {/* Close Button */}
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
