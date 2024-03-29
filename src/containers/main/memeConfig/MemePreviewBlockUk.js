// eslint-disable-next-line
import React from "react";
import Preloader from "./PreloaderComponent.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import styles from "./MemePreviewBlock.module.scss";

export default function MemePreviewBlockUk(props) {
  const [ukMemesLoaded, setUkMemesLoaded] = React.useState(false);
  const url = "https://api.imgur.com/3/account/me/images";
  const token = "02a7154b1bb6296911f0a2de6031103f4b731fb2";

  React.useEffect(() => {
    if (!ukMemesLoaded) {
      fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.data) {
            props.setAllMemeImages(result.data);
            setUkMemesLoaded(true);
          } else {
            console.log("No data found");
          }
        })
        .catch((error) => console.error(error));
    }
  }, [ukMemesLoaded, props]);

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
          <LazyLoadImage
            src={image.link}
            className={styles.imagePreview}
            crossOrigin="anonymous"
            alt=""
            onClick={() => handleClick(image.link)}
            effect="blur"
            placeholder={<Preloader />}
          />
        </div>
      ))}
    </div>
  );
}
