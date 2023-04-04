import React from "react";

export default function AddNewMemeComponent(props) {
  const { setMeme } = props;
  function uploadImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
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
    <label className="form--button upload">
      <p className="text--button">Create your meme</p>
      <input
        type="file"
        className="file-upload-button"
        accept="image/*"
        onChange={uploadImage}
      />
    </label>
  );
}
