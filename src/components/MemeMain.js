/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line
import React from "react";
import DownloadMemeComponent from "./DownloadMemeComponent.js";
import CanvasMemeComponent from "./CanvasMemeComponent.js";
import AddNewMemeComponent from "./AddNewMemeComponent.js";
import MemePreviewBlock from "./MemePreviewBlock.js";

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

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <MemePreviewBlock setMeme={setMeme} allMemeImages={allMemeImages} />
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
        <div className="meme--config">
          <div className="form">
            <textarea
              type="text"
              placeholder="Top text"
              className="form--input"
              name="topText"
              value={meme.topText}
              onChange={handleChange}
            />
            <textarea
              type="text"
              placeholder="Bottom text"
              className="form--input"
              name="bottomText"
              value={meme.bottomText}
              onChange={handleChange}
            />
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
