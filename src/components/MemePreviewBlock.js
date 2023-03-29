import React from "react";

export default function MemePreviewBlock(props) {
  const handleClick = (imageUrl) => {
    props.setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: imageUrl,
    }));
  };
  return (
    <div className="meme-preview">
      {props.allMemeImages.map((image, index) => (
        <div className="im" key={index}>
          <img
            src={image.url}
            className="im--preview"
            crossOrigin="anonymous"
            alt=""
            onClick={() => handleClick(image.url)}
          />
        </div>
      ))}
    </div>
  );
}
