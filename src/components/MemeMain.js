/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line
import React from "react";
import DownloadMemeComponent from "./DownloadMemeComponent.js";
import CanvasMemeComponent from "./CanvasMemeComponent.js";
import AddNewMemeComponent from "./AddNewMemeComponent.js";
import MemePreviewBlock from "./MemePreviewBlock.js";
import MemePreviewBlockUk from "./MemePreviewBlockUk.js";

export default function MemeMain() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemeImages, setAllMemeImages] = React.useState([]);
  const [worldMemesLoaded, setWorldMemesLoaded] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("world");
  const stageRef = React.useRef(null);
  const [topTextPosition] = React.useState({
    x: 30,
    y: 40,
  });
  const [bottomTextPosition] = React.useState({
    x: 30,
    y: 135,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
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
          <div className="tabs">
            <div className="tab">
              <input
                type="radio"
                name="css-tabs"
                id="tab-1"
                checked={activeTab === "world"}
                onChange={() => setActiveTab("world")}
                className="tab-switch"
              />
              <label htmlFor="tab-1" className="tab-label">
                World memes
              </label>
              <div className="tab-content">
                {activeTab === "world" && (
                  <MemePreviewBlock
                    setMeme={setMeme}
                    allMemeImages={allMemeImages}
                    setAllMemeImages={setAllMemeImages}
                    worldMemesLoaded={worldMemesLoaded}
                    setWorldMemesLoaded={setWorldMemesLoaded}
                  />
                )}
              </div>
            </div>
            <div className="tab">
              <input
                type="radio"
                name="css-tabs"
                id="tab-2"
                checked={activeTab === "ukraine"}
                onChange={() => setActiveTab("ukraine")}
                className="tab-switch"
              />
              <label htmlFor="tab-2" className="tab-label">
                Ukrainian memes
              </label>
              <div className="tab-content">
                {activeTab === "ukraine" && (
                  <MemePreviewBlockUk
                    setMeme={setMeme}
                    setAllMemeImages={setAllMemeImages}
                    allMemeImages={allMemeImages}
                  />
                )}
              </div>
            </div>
          </div>

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
