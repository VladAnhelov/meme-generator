import React from "react";

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
    <div className="add--text">
      <button
        type="button"
        className={`add--button ${
          additionalTexts.length >= 3 ? "display-none" : ""
        }`}
        onClick={handleAddButtonClick}
        disabled={additionalTexts.length >= 3}
      >
        <p className="text--button">More Text</p>
      </button>
      {additionalTexts.map((text, index) => (
        <div className="textarea-wrapper" key={index}>
          <textarea
            type="text"
            placeholder="Additional Text"
            className="form--input"
            value={text}
            onChange={(event) => handleTextChange(event, index)}
          />
          <button
            type="button"
            className="delete--button"
            onClick={() => handleDeleteButtonClick(index)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
