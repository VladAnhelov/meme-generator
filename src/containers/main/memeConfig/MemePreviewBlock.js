// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Preloader from "./PreloaderComponent.js";
import styles from "./MemePreviewBlock.module.scss";
import { AutotestId } from "../../../tests/AutotestId.ts";

export default function MemePreviewBlock(props) {
  const [worldMemesLoaded, setWorldMemesLoaded] = useState(false);
  const url = "https://api.imgflip.com/get_memes";

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
      {Array.isArray(props.allMemeImages) &&
        props.allMemeImages.map((image, index) => (
          <div className={styles.image} key={index}>
            <LazyLoadImage
              src={image.url}
              data-testid={AutotestId.MEME_IMAGE}
              effect="blur"
              className={styles.imagePreview}
              crossOrigin="anonymous"
              alt=""
              onClick={() => handleClick(image.url)}
              placeholder={<Preloader />}
            />
          </div>
        ))}
    </div>
  );
}
