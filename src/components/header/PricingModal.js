import React, { useRef, useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import style from "./PricingModal.module.scss";

export default function PricingModal({ show, onClose }) {
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
      <div className={style.grid}>
        <div className={style.card}>
          <button className={style.close_btn} onClick={handleClose}>
            X
          </button>
          <h2 className={style.card_title}>Student</h2>
          <p className={style.pricing}>
            20$<span className={style.small}>/per month</span>
          </p>
          <p>Save $9</p>
          <ul className={style.features}>
            <li>One account</li>
            <li>Unlimited memes</li>
            <li>Add 2 faces</li>
          </ul>
          <a href="/" className={style.cta_btn}>
            Buy Now
          </a>
        </div>
      </div>
      <div className={style.grid}>
        <div className={style.card}>
          <button className={style.close_btn} onClick={handleClose}>
            X
          </button>
          <h2 className={style.card_title}>Personal</h2>
          <p className={style.pricing}>
            39$<span className={style.small}>/per month</span>
          </p>
          <p>Save $15</p>
          <ul className={style.features}>
            <li>One account</li>
            <li>Unlimited memes</li>
            <li>Add 10 faces </li>
          </ul>
          <a href="/" className={style.cta_btn}>
            Buy Now
          </a>
        </div>
      </div>
      <div className={style.grid}>
        <div className={style.card}>
          <button className={style.close_btn} onClick={handleClose}>
            X
          </button>
          <h2 className={style.card_title}>Family</h2>
          <p className={style.pricing}>
            60$<span className={style.small}>/per month</span>
          </p>
          <p>Save $25</p>
          <ul className={style.features}>
            <li>Six account</li>
            <li>Unlimited memes</li>
            <li>Add 20 faces</li>
          </ul>
          <a href="/" className={style.cta_btn}>
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}
