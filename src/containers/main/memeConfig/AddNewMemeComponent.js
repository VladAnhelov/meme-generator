import React from "react";
import styles from "./AddNewMemeComponent.module.scss";

export default function AddNewMemeComponent(props) {
  const { setMeme } = props;
  function uploadImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      setMeme((prevMeme) => ({
        ...prevMeme,
        randomImage: e.target.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  return (
    <label className={styles.uploadButton}>
      <p className={styles.textButton}>Create your meme</p>
      <input
        type="file"
        className={styles.fileUploadButton}
        accept="image/*"
        onChange={uploadImage}
      />
    </label>
  );
}
