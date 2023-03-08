import React from "react";

export default function DownloadMemeComponent(props) {
  const meme = props.meme || {};
  const canvas = document.createElement("canvas");
  const heightRatio = 1.2;
  const container = document.querySelector(".meme--image");
  if (!container) {
    return;
  }

  function updateCanvasSize() {
    canvas.width = container.offsetWidth;
    canvas.height = canvas.width * heightRatio;
  }

  updateCanvasSize();
  window.addEventListener("resize", updateCanvasSize);

  const context = canvas.getContext("2d");

  const image = new Image();
  image.onload = () => {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    if (updateCanvasSize) {
      context.font = "20px Impact";
    } else {
      context.font = "40px Impact";
    }
    context.fillStyle = "#ffffff";
    context.shadowBlur = 5;
    context.shadowColor = "#000";
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.fillText(
      props.meme.topText.toUpperCase(),
      parseInt(props.topTextPosition.x),
      parseInt(props.topTextPosition.y),
    );
    context.fillText(
      props.meme.bottomText.toUpperCase(),
      parseInt(props.bottomTextPosition.x),
      parseInt(props.bottomTextPosition.y),
    );
  };

  image.src = meme.randomImage;
  image.setAttribute("crossorigin", "anonymous");

  const handleDownloadClick = () => {
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="form">
      <button className="download--button" onClick={handleDownloadClick}>
        Download Meme
      </button>
    </div>
  );
}
