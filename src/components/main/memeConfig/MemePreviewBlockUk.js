import React from "react";
import Preloader from "./PreloaderComponent.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "./MemePreviewBlock.module.scss";

export default function MemePreviewBlockUk(props) {
  const [loadedImages, setLoadedImages] = React.useState([]);
  const url = "https://api.imgur.com/3/account/me/images";
  const token = "02a7154b1bb6296911f0a2de6031103f4b731fb2";

  const handleImageLoad = (index) => {
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, index]);
  };

  React.useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.data) {
          props.setAllMemeImages(result.data);
        } else {
          console.log("No data found");
        }
      })
      .catch((error) => console.error(error));
  }, [props]);

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
            {!loadedImages.includes(index) && <Preloader />}
            <LazyLoadImage
              src={image.link}
              className={styles.imagePreview}
              crossOrigin="anonymous"
              alt=""
              onClick={() => handleClick(image.link)}
              onLoad={() => handleImageLoad(index)}
              effect="blur"
              style={{
                display: loadedImages.includes(index) ? "block" : "none",
              }}
            />
          </div>
        ))}
    </div>
  );
}
