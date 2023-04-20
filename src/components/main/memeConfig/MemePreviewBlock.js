// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import Preloader from "./PreloaderComponent.js";
import styles from "./MemePreviewBlock.module.scss";

export default function MemePreviewBlock(props) {
  const [loadedImages, setLoadedImages] = React.useState([]);
  const [worldMemesLoaded, setWorldMemesLoaded] = useState(false);
  const url = "https://api.imgflip.com/get_memes";

  const handleImageLoad = (index) => {
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, index]);
  };

  useEffect(() => {
    if (!worldMemesLoaded) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          props.setAllMemeImages(data.data.memes);
          setWorldMemesLoaded(true);
        });
    }
  }, [worldMemesLoaded, props]);

  const handleClick = (imageUrl) => {
    props.setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: imageUrl,
    }));
  };

  return (
    <div className={styles.memePreview}>
      {props.allMemeImages.map((image, index) => (
        <div className={styles.image} key={index}>
          {!loadedImages.includes(index) && <Preloader />}
          <img
            src={image.url}
            className={styles.imagePreview}
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
