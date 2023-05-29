import React from "react";
import styles from "./Background.module.scss";

export default function Background({ isDarkTheme }) {
  return (
    <>
      {isDarkTheme ? (
        <video autoPlay="autoplay" loop="loop" muted className={styles.video}>
          <source src="/DarkClouds.webm" type="video/webm" />
        </video>
      ) : (
        <video autoPlay="autoplay" loop="loop" muted className={styles.video}>
          <source src="/Clouds.webm" type="video/webm" />
        </video>
      )}
    </>
  );
}
