import React from "react";
import styles from "../main/memeConfig/AddFaceByUserModal.module.scss";

const CanvasZoomControls = ({ onZoomIn, onZoomOut }) => {
  return (
    <div>
      <button className={styles.zoom_plus_button} onClick={onZoomIn}>
        <img
          className={styles.zoom_plus_icon}
          src="https://img.icons8.com/dusk/64/null/zoom-in.png"
          alt="+"
        />
      </button>
      <button className={styles.zoom_minus_button} onClick={onZoomOut}>
        <img
          className={styles.zoom_minus_icon}
          src="https://img.icons8.com/dusk/64/null/zoom-out.png"
          alt="-"
        />
      </button>
    </div>
  );
};

export default CanvasZoomControls;
