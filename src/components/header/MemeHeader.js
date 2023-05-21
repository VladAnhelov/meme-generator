import React from "react";
import NavBarMenu from "./NavBarMenu.js";
import styles from "./MemeHeader.module.scss";

export default function MemeHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.block}>
        <img
          className={styles.trollfaceHeader}
          src="https://stock-image.s3.amazonaws.com/editted-logo-fav-2.png"
          alt=""
        />
        <div className={styles.block_headerName}>
          <h2 className={styles.headerTitle}>Memebulance</h2>
          <h4 className={styles.headerProject}>Vlad Anhelov Project</h4>
        </div>
      </div>
      <NavBarMenu />
    </header>
  );
}
