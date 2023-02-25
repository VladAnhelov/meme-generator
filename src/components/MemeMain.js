/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line
import React from "react";

export default function MemeMain() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemeImages, setAllMemeImages] = React.useState([]);
  const [topTextPosition, setTopTextPosition] = React.useState({
    x: "50%",
    y: "5%",
  });
  const [bottomTextPosition, setBottomTextPosition] = React.useState({
    x: "50%",
    y: "90%",
  });

  React.useEffect(() => {
    const handleMouseDown = (event) => {
      const target = event.target;

      if (target.classList.contains("meme--text")) {
        const textClass = target.classList.contains("top") ? "top" : "bottom";

        function handleMouseMove(event) {
          const image = document.querySelector(".meme--image");
          const imageRect = image.getBoundingClientRect();

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

  function downloadMeme() {
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      context.font = "40px Impact";
      context.fillStyle = "#ffffff";
      context.textAlign = "center";
      context.fillText(meme.topText, canvas.width / 2, 50);
      context.fillText(meme.bottomText, canvas.width / 2, canvas.height - 20);

      const dataURL = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    image.src = meme.randomImage;
    image.setAttribute("crossorigin", "anonymous");
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
      <div className="form">
        <button className="download--button" onClick={downloadMeme}>
          Download Meme
        </button>
      </div>
    </main>
  );
}
