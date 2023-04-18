import React from "react";
import styles from "./AddMoreMemeText.module.css";

export default function AddMoreMemeText(props) {
  const [additionalTexts, setLocalAdditionalTexts] = React.useState([]);
  const { setAdditionalTexts } = props;

  function handleAddButtonClick() {
    if (additionalTexts.length < 3) {
      const newTexts = [...additionalTexts, ""];
      setLocalAdditionalTexts(newTexts);
      setAdditionalTexts(newTexts);
    }
  }

  function handleDeleteButtonClick(index) {
    const newTexts = additionalTexts.filter((_, i) => i !== index);
    setLocalAdditionalTexts(newTexts);
    setAdditionalTexts(newTexts);
  }

  function handleTextChange(event, index) {
    const updatedTexts = [...additionalTexts];
    updatedTexts[index] = event.target.value;
    setLocalAdditionalTexts(updatedTexts);
    setAdditionalTexts(updatedTexts);
  }

  return (
    <div className={styles.addText}>
      <button
        type="button"
        className={`${styles.addButton} ${
          additionalTexts.length >= 3 ? "displayNone" : ""
        }`}
        onClick={handleAddButtonClick}
        disabled={additionalTexts.length >= 3}
      >
        <p className={styles.textButton}>More Text</p>
      </button>
      {[...additionalTexts].reverse().map((text, index) => (
        <div className={styles.textareaWrapper} key={index}>
          <textarea
            type="text"
            placeholder="Additional Text"
            className={styles.formInput}
            value={text}
            onChange={(event) =>
              handleTextChange(event, additionalTexts.length - 1 - index)
            }
          />
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() =>
              handleDeleteButtonClick(additionalTexts.length - 1 - index)
            }
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
