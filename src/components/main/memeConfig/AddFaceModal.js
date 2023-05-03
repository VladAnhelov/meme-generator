import React from "react";
import styles from "./AddFaceModal.module.scss";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function AddFaceModal(addImageToCanvas) {
  const addImgClick = (e) => {
    console.log("test");
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("imageSrc", e.target.src);
  };

  return (
    <div className={styles.block}>
      <div className={styles.facePreview}>
        <div className={styles.faceImage}>
          <img
            src="https://i.ibb.co/v3j8jJw/putin.webp"
            alt="putin"
            className={styles.faces}
            onDragStart={handleDragStart}
            onClick={addImgClick}
          />
        </div>
        <div className={styles.faceImage}>
          <img
            src="https://i.ibb.co/qyxLfLH/upload-24933d81-3bce-4005-84cc-5ba75260a19c.webp"
            alt=""
            className={styles.faces}
            onDragStart={handleDragStart}
          />
        </div>
        <div className={styles.faceImage}>
          <img
            src="https://i.ibb.co/Hn6NWX2/upload-19f1f2ff-d311-4a79-aa99-4d127914aa10.webp"
            alt=""
            className={styles.faces}
            onDragStart={handleDragStart}
          />
        </div>
        <div className={styles.faceImage}>
          <img
            src="https://i.ibb.co/n7JQJFN/upload-23d08464-70f0-43c8-84cf-21336903196d.webp"
            alt=""
            className={styles.faces}
            onDragStart={handleDragStart}
          />
        </div>
        <div className={styles.faceImage}>
          <img
            src="https://i.ibb.co/G21v6vx/upload-2803a8bb-3017-41d7-849f-4830110f15f9.webp"
            alt=""
            className={styles.faces}
            onDragStart={handleDragStart}
          />
        </div>
        <div className={styles.faceImage}>
          <img
            src="https://i.ibb.co/h2HpFBs/upload-e8a223b4-eadb-4308-a98b-ae705d2783c4.webp"
            alt=""
            className={styles.faces}
            onDragStart={handleDragStart}
          />
        </div>
        <div className={styles.faceImage}>
          <img
            src="https://i.ibb.co/v3gsD5v/upload-3e7b1d1a-91d0-40ed-ab33-6f15df04cd16.webp"
            alt=""
            className={styles.faces}
            onDragStart={handleDragStart}
          />
        </div>
        <div className={styles.faceImage}>
          <img
            src="https://i.ibb.co/FWvDdV7/upload-26ab7525-bdca-40bd-ad86-920a688ca1b5-1.webp"
            alt=""
            className={styles.faces}
            onDragStart={handleDragStart}
          />
        </div>
        <div className={styles.faceImage}>
          <img
            src="https://i.ibb.co/VQs7W1C/upload-6029495b-b96a-4682-a616-0cc0682f1fd7.webp"
            alt=""
            className={styles.faces}
            onDragStart={handleDragStart}
          />
        </div>
        <div className={styles.faceImage}>
          <img
            src="https://i.ibb.co/2kh292K/upload-37a1fe95-283a-4b4c-a3c4-1ddcec01c4d9.webp"
            alt=""
            className={styles.faces}
            onDragStart={handleDragStart}
          />
        </div>
        <div className={styles.faceImage}>
          <img
            src="https://i.ibb.co/b67t2qk/upload-a1525259-2e38-4e8c-b17f-d1c49d18d312.webp"
            alt=""
            className={styles.faces}
            onDragStart={handleDragStart}
          />
        </div>
        <div className={styles.faceImage}>
          <img
            src="https://i.ibb.co/y48xS9x/upload-c1bba924-5625-453e-8242-621336418884.webp"
            alt=""
            className={styles.faces}
            onDragStart={handleDragStart}
          />
        </div>
        <div className={styles.faceImage}>
          <img
            src="https://i.ibb.co/crmWhM2/upload-e0b91f3b-2d4d-4620-825b-381e384b9fd4.webp"
            alt=""
            className={styles.faces}
            onDragStart={handleDragStart}
          />
        </div>
        <div className={styles.faceImage}>
          <img
            src="https://i.ibb.co/s59ztVS/upload-dbb62459-1f17-419b-bcc9-773232bbe662.webp"
            alt=""
            className={styles.faces}
            onDragStart={handleDragStart}
          />
        </div>
      </div>
    </div>
  );
}
