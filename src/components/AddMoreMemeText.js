import React from "react";

export default function AddMoreMemeText(props) {
  const [showThirdInput, setShowThirdInput] = React.useState(false);

  function handleAddButtonClick() {
    setShowThirdInput(true);
  }

  function handleDeleteButtonClick() {
    setShowThirdInput(false);
    props.setMeme((prevMeme) => ({
      ...prevMeme,
      thirdText: "",
    }));
  }

  return (
    <div className="add--text">
      <button
        type="button"
        className={`add--button ${showThirdInput ? "clicked" : ""}`}
        onClick={handleAddButtonClick}
      >
        <p className="text--button">More Text</p>
      </button>
      {showThirdInput && (
        <div className="textarea-wrapper">
          <textarea
            type="text"
            placeholder="Text #3"
            className="form--input"
            name="thirdText"
            value={props.meme.thirdText}
            onChange={props.handleChange}
          />
          <button
            type="button"
            className="delete--button"
            onClick={handleDeleteButtonClick}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}
