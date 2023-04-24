import React from "react";
import styles from "./AddFaceModal.module.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import preview from "./MemePreviewBlock.module.scss";

export default function AddFaceModal() {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("imageSrc", e.target.src);
  };
  return (
    <div className={styles.block}>
      <div className={preview.memePreview}>
        <div className={preview.image}>
          <img
            src="https://i.ibb.co/v3j8jJw/putin.webp"
            alt="putin"
            className={styles.faces}
            onDragStart={handleDragStart}
          />
        </div>
        <div className={preview.image}>
          <img
            src="https://i.ibb.co/qyxLfLH/upload-24933d81-3bce-4005-84cc-5ba75260a19c.webp"
            alt=""
            className={styles.faces}
            onDragStart={handleDragStart}
          />
        </div>
        <div className={preview.image}>
          <img
            src="https://i.ibb.co/Hn6NWX2/upload-19f1f2ff-d311-4a79-aa99-4d127914aa10.webp"
            alt=""
            className={styles.faces}
            onDragStart={handleDragStart}
          />
        </div>
        <div className={preview.image}>
          <img
            src="https://i.ibb.co/n7JQJFN/upload-23d08464-70f0-43c8-84cf-21336903196d.webp"
            alt=""
            className={styles.faces}
            onDragStart={handleDragStart}
          />
        </div>
      </div>
    </div>
  );
}
