import React, { useState } from "react";
import styles from "./DownloadMemeComponent.module.css";

export default function DownloadMemeComponent(props) {
  const [clicked, setClicked] = useState(false);

  const handleDownloadClick = () => {
    setClicked(true);

    const dataURL = props.stageRef.current.toDataURL({
      mimeType: "image/png",
      quality: 1,
    });
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = dataURL;
    setTimeout(() => {
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);

    setTimeout(() => {
      setClicked(false);
    }, 1000);
  };

  return (
    <div className={styles.download}>
      <button
        className={`${styles.downloadBtn} ${
          clicked ? `${styles.clicked}` : ""
        }`}
        onClick={handleDownloadClick}
      >
        {clicked ? (
          ""
        ) : (
          <>
            <p className={styles.textButton}>Download Meme</p>
          </>
        )}
      </button>
    </div>
  );
}
