import React from "react";
import styles from "./AddFaceByUserModal.module.scss";
import removeBackground from "./RemoveBackground.js";

export default function AddFaceByUserModal({ addImageToCanvas }) {
  const [showModal, setShowModal] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const apiKey = "MXgyYrcr6m4fRh9TCgB2pLhD";

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const noBackgroundImage = await removeBackground(file, apiKey);
    setImage(`data:image/png;base64,${noBackgroundImage}`);
  };

  const handleClick = (e) => {
    setShowModal(!showModal);
  };

  const addImgClick = (e) => {
    addImageToCanvas(e.target.src, e);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("imageSrc", e.target.src);
  };

  return (
    <>
      <div className={styles.block}>
        <button className={styles.chooseUserFace} onClick={handleClick}>
          Add your face
          <div className={styles.block_add}></div>
        </button>
      </div>
      <div
        className={`${styles.remove_bg_modal} ${
          showModal ? styles.modal_show : ""
        }`}
      >
        <div className={styles.remove_bg_content}>
          {/* Add your modal content here */}
          In progress
          <input
            className={styles.upload_face}
            type="file"
            onChange={handleImageUpload}
          />
          {image && (
            <img
              src={image}
              className={styles.userFacePreview}
              onDragStart={handleDragStart}
              onClick={addImgClick}
              alt="User face"
            />
          )}
          <button className={styles.close_btn} onClick={handleClick}>
            X
          </button>
        </div>
      </div>
    </>
  );
}
