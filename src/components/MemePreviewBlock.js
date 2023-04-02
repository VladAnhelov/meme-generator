import React from "react";

export default function MemePreviewBlock(props) {
  const url = "https://api.imgflip.com/get_memes";

  React.useEffect(() => {
    if (!props.worldMemesLoaded) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          props.setAllMemeImages(data.data.memes);
          props.setWorldMemesLoaded(true);
        });
    } else {
      props.setWorldMemesLoaded(false);
    }
  }, [props.worldMemesLoaded]);

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
