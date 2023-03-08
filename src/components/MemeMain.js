/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line
import React from "react";
import DownloadMeme from "./DownloadMeme.js";

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

  React.useEffect(() => {
    const handleMouseDown = (event) => {
      const target = event.target;

      if (target.classList.contains("meme--text")) {
        const textClass = target.classList.contains("top") ? "top" : "bottom";

        function handleMouseMove(event) {
          const IMAGE = document.querySelector(".meme--image");
          const imageRect = IMAGE.getBoundingClientRect();
          const text = document.querySelector(".meme--text.top");
          const textRect = text.getBoundingClientRect();
          const textWidth = textRect.width;
          const textHeight = textRect.height;

          const container = document.querySelector(".meme");
          const containerRect = container.getBoundingClientRect();
          const containerHeight = containerRect.height;

          let x = event.clientX - containerRect.left;
          let y = event.clientY - containerRect.top;

          let textX = x - textWidth / 2;
          let textY = y - textHeight / 2;

          if (textX < imageRect.left) {
            textX = imageRect.left;
          } else if (textX + textWidth > imageRect.right) {
            textX = imageRect.right - textWidth;
          }

          if (textY < 0) {
            textY = 0;
          } else if (textY + textHeight > containerHeight) {
            textY = containerHeight - textHeight;
          }

          if (textClass === "top") {
            setTopTextPosition({
              ...topTextPosition,
              x: `${textX}px`,
              y: `${textY}px`,
            });
          } else {
            setBottomTextPosition({
              ...bottomTextPosition,
              x: `${textX}px`,
              y: `${textY}px`,
            });
          }
        }

        const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [topTextPosition, bottomTextPosition]);

  console.log(
    "start text position Top",
    parseInt(topTextPosition.x),
    parseInt(topTextPosition.y),
  );
  console.log(
    "start text position Bottom",
    parseInt(bottomTextPosition.x),
    parseInt(bottomTextPosition.y),
  );

  function useTouchListeners() {
    React.useEffect(() => {
      const handleTouchStart = (event) => {
        const target = event.target;

        if (target.classList.contains("meme--text")) {
          const textClass = target.classList.contains("top") ? "top" : "bottom";

          function handleTouchMove(event) {
            const IMAGE = document.querySelector(".meme--image");
            const imageRect = IMAGE.getBoundingClientRect();
            const text = document.querySelector(".meme--text.top");
            const textRect = text.getBoundingClientRect();
            const textWidth = textRect.width;
            const textHeight = textRect.height;

            const container = document.querySelector(".meme");
            const containerRect = container.getBoundingClientRect();
            const containerHeight = containerRect.height;

            let x = event.touches[0].clientX - containerRect.left;
            let y = event.touches[0].clientY - containerRect.top;

            let textX = x - textWidth / 2;
            let textY = y - textHeight / 2;

            if (textX < imageRect.left) {
              textX = imageRect.left;
            } else if (textX + textWidth > imageRect.right) {
              textX = imageRect.right - textWidth;
            }

            if (textY < 0) {
              textY = 0;
            } else if (textY + textHeight > containerHeight) {
              textY = containerHeight - textHeight;
            }

            if (textClass === "top") {
              setTopTextPosition({
                ...topTextPosition,
                x: `${textX}px`,
                y: `${textY}px`,
              });
            } else {
              setBottomTextPosition({
                ...bottomTextPosition,
                x: `${textX}px`,
                y: `${textY}px`,
              });
            }
          }

          const handleTouchEnd = () => {
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
          };

          document.addEventListener("touchmove", handleTouchMove);
          document.addEventListener("touchend", handleTouchEnd);
        }
      };

      document.addEventListener("touchstart", handleTouchStart);

      return () => {
        document.removeEventListener("touchstart", handleTouchStart);
      };
    }, [topTextPosition, bottomTextPosition]);

    return null;
  }

  useTouchListeners();

  function getFontSize(fontSize, image) {
    const containerWidth = document.querySelector(".meme");
    const imageWidth = image.naturalWidth;
    const scale = containerWidth / imageWidth;

    return `${fontSize * scale}px`;
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
            fontSize: getFontSize(topTextPosition.fontSize, meme.randomImage),
          }}
        >
          {meme.topText}
        </div>
        <div
          className="meme--text bottom"
          style={{
            top: bottomTextPosition.y,
            left: bottomTextPosition.x,
            fontSize: getFontSize(
              bottomTextPosition.fontSize,
              meme.randomImage,
            ),
          }}
        >
          {meme.bottomText}
        </div>
      </div>
      <DownloadMeme
        meme={meme}
        topTextPosition={topTextPosition}
        bottomTextPosition={bottomTextPosition}
      />
    </main>
  );
}
