import React from "react";
import styles from "./AddFaceModal.module.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import preview from "./MemePreviewBlock.module.scss";

export default function AddFaceModal() {
  return (
    <div className={styles.block}>
      <div className={preview.memePreview}>
        <div className={preview.image}>
          <p>preview face block</p>
        </div>
        <div className={preview.image}>
          <p>preview face block</p>
        </div>
        <div className={preview.image}>
          <p>preview face block</p>
        </div>
        <div className={preview.image}>
          <p>preview face block</p>
        </div>
      </div>
    </div>
  );
}
