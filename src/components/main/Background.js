// Background.js
import React, { useContext } from "react";
import styles from "./Background.module.scss";
import { ThemeContext } from "../main/ThemeContext.js";

export default function Background() {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <>
      {isDarkTheme ? (
        <img src="/AboveClouds.png" alt="" className={styles.background} />
      ) : (
        <img src="/DarkClouds.png" alt="" className={styles.background} />
      )}
    </>
  );
}
