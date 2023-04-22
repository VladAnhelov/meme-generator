import React from "react";
import styles from "./AddFaceModal.module.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import preview from "./MemePreviewBlock.module.scss";

export default function AddFaceModal() {
  return (
    <div className={styles.block}>
      <div className={preview.memePreview}>
        <div className={preview.image}>
          <img
            src="https://d2kq0urxkarztv.cloudfront.net/5d8f5dc9901529561bb5c608/3521540/upload-2e25db21-ebe1-430b-99d9-b08e8587424e.png?w=191&e=webp&nll=true"
            alt=""
            className={styles.faces}
          />
        </div>
        <div className={preview.image}>
          <img
            src="https://d2kq0urxkarztv.cloudfront.net/5d8f5dc9901529561bb5c608/3521540/upload-24933d81-3bce-4005-84cc-5ba75260a19c.png?w=158&e=webp&nll=true"
            alt=""
            className={styles.faces}
          />
        </div>
        <div className={preview.image}>
          <img
            src="https://d2kq0urxkarztv.cloudfront.net/5d8f5dc9901529561bb5c608/3521540/upload-19f1f2ff-d311-4a79-aa99-4d127914aa10.png?w=188&e=webp&nll=true"
            alt=""
            className={styles.faces}
          />
        </div>
        <div className={preview.image}>
          <img
            src="https://d2kq0urxkarztv.cloudfront.net/5d8f5dc9901529561bb5c608/3521540/upload-23d08464-70f0-43c8-84cf-21336903196d.png?w=245&e=webp&nll=true"
            alt=""
            className={styles.faces}
          />
        </div>
      </div>
    </div>
  );
}
