import React, { useState, useEffect, useRef } from "react";
import style from "./BurgerMenu.module.scss";
import MainNavMenu from "./MainNavMenu.js";
import anime from "animejs/lib/anime.es.js";

export default function BurgerMenu({ onAboutClick, onPricingClick }) {
  const [open, setOpen] = useState(false);
  const menuContentRef = useRef(null);

  useEffect(() => {
    if (open) {
      const menuHeight = menuContentRef.current.scrollHeight;
      anime({
        targets: menuContentRef.current,
        height: [0, menuHeight],
        duration: 100,
        easing: "easeInOutQuad",
      });
    }
  }, [open]);

  const handleClose = () => {
    const menuHeight = menuContentRef.current.scrollHeight;
    anime({
      targets: menuContentRef.current,
      height: [menuHeight, 0],
      duration: 100,
      easing: "easeInOutQuad",
    }).finished.then(() => setOpen(false));
  };

  const handleClickOutside = (event) => {
    if (
      menuContentRef.current &&
      !menuContentRef.current.contains(event.target)
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
    <div className={style.BurgerMenu_block}>
      <div
        className={`${style.menu_btn} ${open ? style.open : ""}`}
        onClick={() => setOpen(!open)}
      >
        <div className={style.menu_btn_icon}></div>
      </div>
      {open && (
        <div
          ref={menuContentRef}
          className={style.menu_content}
          onClick={handleClose}
        >
          <MainNavMenu
            onAboutClick={onAboutClick}
            onPricingClick={onPricingClick}
            onClick={handleClose}
          />
        </div>
      )}
    </div>
  );
}
