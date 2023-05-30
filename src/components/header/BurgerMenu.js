import React, { useState, useContext, useEffect } from "react";
import style from "./BurgerMenu.module.scss";
import { ThemeContext } from "../main/ThemeContext.js";

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);

  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--icon-color",
      isDarkTheme ? "black" : "white",
    );
  }, [isDarkTheme]);

  return (
    <div className={style.BurgerMenu_block}>
      <div
        className={`${style.menu_btn} ${open ? style.open : ""}`}
        onClick={() => setOpen(!open)}
      >
        <div className={style.menu_btn_icon}></div>
      </div>
    </div>
  );
}
