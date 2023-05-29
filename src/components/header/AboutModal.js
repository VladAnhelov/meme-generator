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

  return (
    <div className={style.aboutBlock} ref={modalRef}>
      <p>Hello world</p>
      <button className={style.close_btn} onClick={handleClose}>
        X
      </button>
    </div>
  );
}
