import React from "react";
import styles from "./AddFaceByUserModal.module.scss";
import CanvasUserFace from "../../canvas/CanvasUserFace.js";
import CanvasZoomControls from "../../canvas/CanvasZoomControls.js";
import LoginModal from "./LoginModal.js";

export default function AddFaceByUserModal({ addImageToCanvas }) {
  const [showModal, setShowModal] = React.useState(false);
  const [editedImage, setEditedImage] = React.useState(null);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [isCanvasVisible, setIsCanvasVisible] = React.useState(true);
  const [lastTouchTime, setLastTouchTime] = React.useState(0);
  const [isErasing, setIsErasing] = React.useState(false);
  const [isEraserIconActive, setIsEraserIconActive] = React.useState(false);
  const [isSaveIconActive, setIsSaveIconActive] = React.useState(false);
  const canvasUserFaceRef = React.useRef(null);
  const [isSignedIn] = React.useState(false);

  const handleTouchStart = (e) => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastTouchTime;

    if (timeDiff < 300) {
      // 300 мс - час між двома тапами
      handleImageDoubleClick();
    }

    setLastTouchTime(currentTime);
  };

  const handleZoomIn = () => {
    if (canvasUserFaceRef.current) {
      canvasUserFaceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (canvasUserFaceRef.current) {
      canvasUserFaceRef.current.zoomOut();
    }
  };

  const toggleEraser = () => {
    setIsErasing(!isErasing);
    setIsEraserIconActive(!isEraserIconActive);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const handleClick = (e) => {
    setShowModal(!showModal);
  };

  const addImgClick = (e) => {
    addImageToCanvas(e.target.src, e);
  };

  const handleImageDoubleClick = () => {
    setIsCanvasVisible(true);
    setIsSaveIconActive(false);
    setIsSaveButtonDisabled(false);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("imageSrc", e.target.src);
  };

  const handleSave = () => {
    setIsSaveButtonDisabled(true);
    const dataUrl = canvasUserFaceRef.current.saveImage();
    setEditedImage(dataUrl);
    setIsCanvasVisible(false);
    setIsSaveIconActive(!isSaveIconActive);
  };

  return (
    <>
      <div className={styles.block}>
        <button className={styles.chooseUserFace} onClick={handleClick}>
          Add your face
          <div className={styles.block_add}></div>
        </button>
      </div>
      {showModal && !isSignedIn ? (
        <LoginModal setShowModal={setShowModal} />
      ) : (
        <div
          className={`${styles.remove_bg_modal} ${
            showModal ? styles.modal_show : ""
          }`}
        >
          <div className={styles.remove_bg_content}>
            <div className={styles.title_block}>
              <p className={styles.title}>Add Your Face</p>
              <p className={styles.title}>Click to Add</p>
            </div>
            <div className={styles.upload_and_preview_block}>
              <label
                className={styles.custom_file_upload}
                onChange={handleImageUpload}
              >
                <input type="file" />
                Upload
              </label>
              <div className={styles.edit_block}>
                <div className={styles.edit_block_items}>
                  <div>
                    <button
                      className={styles.eraserButton}
                      onClick={toggleEraser}
                    >
                      <img
                        className={`${styles.eraserIcon} ${
                          isErasing && isEraserIconActive
                            ? styles.eraserIcon_active
                            : ""
                        }`}
                        src="https://img.icons8.com/dusk/64/null/eraser.png"
                        alt="eraser"
                      />
                    </button>
                  </div>
                  <div>
                    <button
                      className={styles.saveButton}
                      onClick={handleSave}
                      disabled={isSaveButtonDisabled}
                    >
                      <img
                        className={`${styles.saveIcon} ${
                          isSaveIconActive ? styles.saveIcon_active : ""
                        }`}
                        src="https://img.icons8.com/dusk/64/null/save--v1.png"
                        alt="save"
                      />
                    </button>
                  </div>
                </div>
                <div>
                  <div>
                    <CanvasZoomControls
                      onZoomIn={handleZoomIn}
                      onZoomOut={handleZoomOut}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <button
                      className={styles.undoButton}
                      onClick={() => canvasUserFaceRef.current.undo()}
                    >
                      <img
                        className={styles.undoIcon}
                        src="https://img.icons8.com/dusk/64/null/reply-arrow.png"
                        alt="back"
                      />
                    </button>
                    <button
                      className={styles.redoButton}
                      onClick={() => canvasUserFaceRef.current.redo()}
                    >
                      <img
                        className={styles.redoIcon}
                        src="https://img.icons8.com/dusk/64/null/forward-arrow.png"
                        alt="forward"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {isCanvasVisible ? (
                <div className={styles.canvasPreview}>
                  <CanvasUserFace
                    ref={canvasUserFaceRef}
                    src={image}
                    isErasing={isErasing}
                  />
                </div>
              ) : editedImage ? (
                <img
                  src={editedImage}
                  className={styles.userFacePreview}
                  onDragStart={handleDragStart}
                  onClick={addImgClick}
                  onDoubleClick={handleImageDoubleClick}
                  onTouchStart={handleTouchStart}
                  alt=""
                />
              ) : (
                <img
                  src={image}
                  className={styles.userFacePreview}
                  onDragStart={handleDragStart}
                  onClick={addImgClick}
                  onDoubleClick={handleImageDoubleClick}
                  onTouchStart={handleTouchStart}
                  alt=""
                />
              )}
            </div>
            <button className={styles.close_btn} onClick={handleClick}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}
