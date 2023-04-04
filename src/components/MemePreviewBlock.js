import React from "react";
import Preloader from "./PreloaderComponent.js";

export default function MemePreviewBlock(props) {
  const [loadedImages, setLoadedImages] = React.useState([]);
  const url = "https://api.imgflip.com/get_memes";

  const handleImageLoad = (index) => {
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, index]);
  };

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
          {!loadedImages.includes(index) && <Preloader />}
          <img
            src={image.url}
            className="im--preview"
            crossOrigin="anonymous"
            alt=""
            onClick={() => handleClick(image.url)}
            onLoad={() => handleImageLoad(index)}
            style={{ display: loadedImages.includes(index) ? "block" : "none" }}
          />
        </div>
      ))}
    </div>
  );
}
