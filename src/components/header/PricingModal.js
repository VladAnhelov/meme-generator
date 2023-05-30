import React, { useRef, useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import style from "./PricingModal.module.scss";

export default function PricingModal({ show, onClose }) {
  const modalRef1 = useRef(null);
  const modalRef2 = useRef(null);
  const modalRef3 = useRef(null);

  useEffect(() => {
    if (show) {
      anime({
        targets: [modalRef1.current, modalRef2.current, modalRef3.current],
        translateY: [-500, 0],
        translateX: [20, 0],
        scale: [0.1, 1],
        duration: 2000,
        easing: "easeOutElastic(1, 1.5)",
        delay: anime.stagger(100), // delay by 200ms for each element.
      });
    }
  }, [show]);

  const handleClose = () => {
    anime({
      targets: [modalRef1.current, modalRef2.current, modalRef3.current],
      translateY: [0, -500],
      translateX: [0, -20],
      scale: [1, 0.1],
      duration: 2000,
      easing: "easeOutElastic(1, 1.5)",
      complete: onClose, // set showAboutModal to false after animation finishes
      delay: anime.stagger(100), // delay by 200ms for each element.
    });
  };

  const handleClickOutside = (event) => {
    if (
      !modalRef1.current.contains(event.target) &&
      !modalRef2.current.contains(event.target) &&
      !modalRef3.current.contains(event.target)
    ) {
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
    <div className={style.pricingBlock}>
      <div className={style.grid}>
        <div className={style.card} ref={modalRef1}>
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
        <div className={style.card} ref={modalRef2}>
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
        <div className={style.card} ref={modalRef3}>
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
