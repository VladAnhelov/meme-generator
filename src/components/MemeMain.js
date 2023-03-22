/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line
import React from "react";
import DownloadMemeComponent from "./DownloadMemeComponent.js";
import CanvasMemeComponent from "./CanvasMemeComponent.js";
import AddNewMemeComponent from "./AddNewMemeComponent.js";

export default function MemeMain() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemeImages, setAllMemeImages] = React.useState([]);
  const [topTextPosition] = React.useState({
    x: 30,
    y: 40,
  });
  const [bottomTextPosition] = React.useState({
    x: 30,
    y: 135,
  });
  const stageRef = React.useRef(null);

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
      </div>
      <div className="user--buttons">
        <button className="form--button" onClick={getMemeImage}>
          <p className="text--button">Choose meme</p>
          <img
            src={`${process.env.PUBLIC_URL}/cat-icon.png`}
            alt="Download"
            className="cat-icon"
          />
        </button>
        <AddNewMemeComponent setMeme={setMeme} />
      </div>
      <div className="meme">
        <CanvasMemeComponent
          meme={meme}
          topTextPosition={topTextPosition}
          bottomTextPosition={bottomTextPosition}
          stageRef={stageRef}
        />
        <img
          src={meme.randomImage}
          className="meme--image"
          crossOrigin="anonymous"
        />
        <div className="meme--config"></div>
      </div>
      <DownloadMemeComponent
        meme={meme}
        topTextPosition={topTextPosition}
        bottomTextPosition={bottomTextPosition}
        stageRef={stageRef}
      />
    </main>
  );
}
