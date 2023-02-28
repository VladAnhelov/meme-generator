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
    x: 100,
    y: 50,
  });
  const [bottomTextPosition, setBottomTextPosition] = React.useState({
    x: 100,
    y: 480,
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
    "start text position",
    parseInt(topTextPosition.x),
    parseInt(topTextPosition.y),
  );

  function addTouchListeners() {
    const memeContainerElement = document.querySelector(".meme--image");
    const memeTextElements = document.querySelectorAll(".meme--text");

    if (memeContainerElement && memeTextElements.length > 0) {
      const textClass = memeTextElements[0].classList.contains("top")
        ? "top"
        : "bottom";

      memeTextElements.forEach((memeTextElement) => {
        let initialX = null;
        let initialY = null;
        let currentX = null;
        let currentY = null;

        memeTextElement.addEventListener("touchstart", (e) => {
          initialX = e.touches[0].clientX;
          initialY = e.touches[0].clientY;
        });

        memeTextElement.addEventListener("touchmove", (e) => {
          e.preventDefault();
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;

          initialX = e.touches[0].clientX;
          initialY = e.touches[0].clientY;

          const memeTextRect = memeTextElement.getBoundingClientRect();
          const memeContainerRect = memeContainerElement.getBoundingClientRect();

          const isInsideLeftBoundary =
            memeTextRect.left + currentX >= memeContainerRect.left;
          const isInsideRightBoundary =
            memeTextRect.right + currentX <= memeContainerRect.right;
          const isInsideTopBoundary =
            memeTextRect.top + currentY >= memeContainerRect.top;
          const isInsideBottomBoundary =
            memeTextRect.bottom + currentY <= memeContainerRect.bottom;

          if (
            isInsideLeftBoundary &&
            isInsideRightBoundary &&
            isInsideTopBoundary &&
            isInsideBottomBoundary
          ) {
            requestAnimationFrame(() => {
              memeTextElement.style.left =
                memeTextElement.offsetLeft + currentX + "px";
              memeTextElement.style.top =
                memeTextElement.offsetTop + currentY + "px";
              if (
                parseInt(memeTextElement.style.left) < memeContainerRect.left
              ) {
                memeTextElement.style.left = memeContainerRect.left + "px";
              }
              if (parseInt(memeTextElement.style.top) < memeContainerRect.top) {
                memeTextElement.style.top = memeContainerRect.top + "px";
              }
            });
            console.log("left", parseInt(memeTextElement.style.left));
            console.log("top", parseInt(memeTextElement.style.top));
          }
          if (textClass === "top") {
            setTopTextPosition({
              ...topTextPosition,
              x: `${memeTextElement.style.left}`,
              y: `${memeTextElement.style.top}`,
            });
          } else {
            setBottomTextPosition({
              ...bottomTextPosition,
              x: `${memeTextElement.style.left}`,
              y: `${memeTextElement.style.top}`,
            });
          }
        });
      });
    }
  }

  addTouchListeners();

  function getFontSize(fontSize, image) {
    const containerWidth = document.querySelector(".meme");
    const imageWidth = image.naturalWidth;
    const scale = containerWidth / imageWidth;

    return `${fontSize * scale}px`;
  }

  function downloadMeme() {
    const IMAGE = document.querySelector(".meme--image");
    const imageRect = IMAGE.getBoundingClientRect();
    const canvas = document.createElement("canvas");
    canvas.width = imageRect.width;
    console.log("image size in download", imageRect.width, imageRect.height);
    canvas.height = 550;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      context.font = "40px Impact";
      context.fillStyle = "#ffffff";
      context.shadowBlur = 5;
      context.shadowColor = "#000";
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      context.fillText(
        meme.topText.toUpperCase(),
        parseInt(topTextPosition.x),
        parseInt(topTextPosition.y),
      );
      context.fillText(
        meme.bottomText.toUpperCase(),
        parseInt(bottomTextPosition.x),
        parseInt(bottomTextPosition.y),
      );

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
      <div className="form">
        <button className="download--button" onClick={downloadMeme}>
          Download Meme
        </button>
      </div>
    </main>
  );
}
