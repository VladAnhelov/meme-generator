import React, { useContext } from "react";
import NavBarMenu from "./NavBarMenu.js";
import styles from "./MemeHeader.module.scss";
import { ThemeContext } from "../main/ThemeContext.js"; // Імпортуйте ваш контекст тут

export default function MemeHeader() {
  const { isDarkTheme } = useContext(ThemeContext); // Використовуйте контекст тут

  const headerNameStyle = {
    color: isDarkTheme ? "black" : "white", // Змініть ці кольори на ті, які ви хочете використовувати для темної та світлої тем
  };

  return (
    <header className={styles.header}>
      <div className={styles.block}>
        <img
          className={styles.trollfaceHeader}
          src="https://stock-image.s3.amazonaws.com/editted-logo-fav-2.png"
          alt=""
        />
        <div className={styles.block_headerName} style={headerNameStyle}>
          <h2>Memebulance</h2>
          <h4>Vlad Anhelov Project</h4>
        </div>
      </div>
      <NavBarMenu />
    </header>
  );
}
