import React from "react";
import styles from "./AddFaceByUserModal.module.scss";
export default function AddFaceByUserModal() {
  const [showModal, setShowModal] = React.useState(false);
  const handleClick = (e) => {
    setShowModal(!showModal);
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
          <button className={styles.close_btn} onClick={handleClick}>
            X
          </button>
        </div>
      </div>
    </>
  );
}
