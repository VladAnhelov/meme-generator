/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line
import React from "react";
import DownloadMemeComponent from "./DownloadMemeComponent.js";
import TouchEventComponent from "./TouchEventComponent.js";

export default function MemeMain() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemeImages, setAllMemeImages] = React.useState([]);
  const [topTextPosition, setTopTextPosition] = React.useState({
    x: 30,
    y: 40,
  });
  const [bottomTextPosition, setBottomTextPosition] = React.useState({
    x: 30,
    y: 135,
  });
  const [containerSize, setContainerSize] = React.useState({
    width: 0,
    height: 0,
  });
  const [imageElement, setImageElement] = React.useState(null);

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemeImages(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemeImages.length);
    const url = allMemeImages[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <TouchEventComponent
        setTopTextPosition={setTopTextPosition}
        setBottomTextPosition={setBottomTextPosition}
        topTextPosition={topTextPosition}
        bottomTextPosition={bottomTextPosition}
        containerSize={containerSize}
        imageElement={imageElement}
      />
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img
          src={meme.randomImage}
          className="meme--image"
          crossOrigin="anonymous"
        />
        <div
          className="meme--text top"
          style={{
            top: topTextPosition.y,
            left: topTextPosition.x,
          }}
        >
          {meme.topText}
        </div>
        <div
          className="meme--text bottom"
          style={{
            top: bottomTextPosition.y,
            left: bottomTextPosition.x,
          }}
        >
          {meme.bottomText}
        </div>
      </div>
      <DownloadMemeComponent
        meme={meme}
        topTextPosition={topTextPosition}
        bottomTextPosition={bottomTextPosition}
      />
    </main>
  );
}
