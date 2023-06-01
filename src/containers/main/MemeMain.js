/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line
import React from "react";
import DownloadMemeComponent from "./memeConfig/DownloadMemeComponent.js";
import CanvasMeme from "../../components/canvas/CanvasMeme.js";
import AddNewMemeComponent from "./memeConfig/AddNewMemeComponent.js";
import MemePreviewBlock from "./memeConfig/MemePreviewBlock.js";
import MemePreviewBlockUk from "./memeConfig/MemePreviewBlockUk.js";
import AddMoreMemeText from "./memeConfig/AddMoreMemeText.js";
import ColorPaletteComponent from "./memeConfig/ColorPaletteComponent.js";
import AddFaceModal from "./memeConfig/AddFaceModal.js";
import styles from "./MemeMain.module.scss";
import forms from "./memeConfig/AddMoreMemeText.module.scss";
import AddFaceByUserModal from "./memeConfig/AddFaceByUserModal.js";

export default function MemeMain() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    thirdText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemeImages, setAllMemeImages] = React.useState([]);
  const [, setWorldMemesLoaded] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("world");
  const stageRef = React.useRef(null);
  const [topTextPosition] = React.useState({
    x: 30,
    y: 40,
  });
  const [bottomTextPosition] = React.useState({
    x: 30,
    y: 105,
  });

  const [thirdTextPosition] = React.useState({
    x: 30,
    y: 165,
  });

  const [additionalTexts, setAdditionalTexts] = React.useState([]);
  const [selectedColor, setSelectedColor] = React.useState("");

  const [images, setImages] = React.useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  // Додає зображення на канвас за координатами курсора миші, коли користувач клікає на сцені.
  const addImageToCanvas = (imageSrc, e) => {
    const stage = stageRef.current.getStage();

    // Перевірте, чи клікнув користувач на сцені, замість перетягування зображення
    if (!stage.isDragging()) {
      const image = new window.Image();
      image.src = imageSrc;

      image.onload = () => {
        const centerX = stage.attrs.width / 2 + image.width / 2;
        const centerY = stage.attrs.height / 2 + image.height / 2;

        setImages((prevImages) => [
          ...prevImages,
          {
            src: imageSrc,
            x: centerX,
            y: centerY,
            id: "image-" + new Date().getTime(),
          },
        ]);
        console.log(stage.attrs.width);
        console.log(image.width);
      };
    }
  };

  return (
    <main>
      <div className={styles.meme}>
        <CanvasMeme
          meme={meme}
          topTextPosition={topTextPosition}
          bottomTextPosition={bottomTextPosition}
          thirdTextPosition={thirdTextPosition}
          additionalTexts={additionalTexts}
          images={images}
          setImages={setImages}
          stageRef={stageRef}
          selectedColor={selectedColor}
        />
        <img
          src={meme.randomImage}
          className={styles.memeImage}
          crossOrigin="anonymous"
        />
        <div className={styles.memeConfig}>
          <div className={styles.tabs}>
            <div className={styles.tab}>
              <input
                type="radio"
                name="css-tabs"
                id="tab-1"
                checked={activeTab === "world"}
                onChange={() => setActiveTab("world")}
                className={styles.tabSwitch}
              />
              <label htmlFor="tab-1" className={styles.tabLabel}>
                World memes
              </label>
            </div>
            <div className={styles.tab}>
              <input
                type="radio"
                name="css-tabs"
                id="tab-2"
                checked={activeTab === "ukraine"}
                onChange={() => setActiveTab("ukraine")}
                className={styles.tabSwitch}
              />
              <label htmlFor="tab-2" className={styles.tabLabel}>
                Ukrainian memes
              </label>
            </div>
          </div>
          <div className={styles.tabContent}>
            {activeTab === "world" ? (
              <MemePreviewBlock
                setMeme={setMeme}
                allMemeImages={allMemeImages}
                setAllMemeImages={setAllMemeImages}
                setWorldMemesLoaded={setWorldMemesLoaded}
              />
            ) : (
              <MemePreviewBlockUk
                setMeme={setMeme}
                setAllMemeImages={setAllMemeImages}
                allMemeImages={allMemeImages}
              />
            )}
          </div>
          <AddFaceModal addImageToCanvas={addImageToCanvas} />
          <div className={styles.blockSettings}>
            <div className={forms.form}>
              <textarea
                type="text"
                placeholder="Top text"
                className={forms.formInput}
                name="topText"
                value={meme.topText}
                onChange={handleChange}
              />
              <textarea
                type="text"
                placeholder="Bottom text"
                className={forms.formInput}
                name="bottomText"
                value={meme.bottomText}
                onChange={handleChange}
              />
              <AddMoreMemeText
                meme={meme}
                handleChange={handleChange}
                setMeme={setMeme}
                additionalTexts={additionalTexts}
                setAdditionalTexts={setAdditionalTexts}
              />
            </div>
            <div className={styles.settings}>
              <ColorPaletteComponent handleColorChange={handleColorChange} />
              <AddFaceByUserModal addImageToCanvas={addImageToCanvas} />
            </div>
          </div>
          <div className={styles.btnsBlock}>
            <AddNewMemeComponent setMeme={setMeme} />
            <DownloadMemeComponent
              meme={meme}
              topTextPosition={topTextPosition}
              bottomTextPosition={bottomTextPosition}
              stageRef={stageRef}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
