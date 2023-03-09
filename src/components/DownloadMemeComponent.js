import React, { useEffect, useRef, useState } from "react";

export default function DownloadMemeComponent(props) {
  const { meme, topTextPosition, bottomTextPosition } = props;
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const heightRatio = 1.2;

  useEffect(() => {
    const container = document.querySelector(".meme--image");
    if (!container) {
      console.error(".meme--image selector did not match any elements");
      return;
    }
    setCanvasWidth(container.offsetWidth);
    const handleResize = () => setCanvasWidth(container.offsetWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.width = canvasWidth;
    canvas.height = canvasWidth * heightRatio;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      context.fillStyle = "#ffffff";
      context.shadowBlur = 5;
      context.shadowColor = "#000";
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      if (canvasWidth < 500) {
        context.font = "20px Impact";
      } else {
        context.font = "40px Impact";
      }
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
    };
    image.src = meme.randomImage;
    image.setAttribute("crossorigin", "anonymous");
  }, [canvasWidth, meme, topTextPosition, bottomTextPosition]);

  const handleDownloadClick = () => {
    const canvas = canvasRef.current;
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
      <canvas ref={canvasRef} className="canvas--meme" />
      <button className="download--button" onClick={handleDownloadClick}>
        Download Meme
      </button>
    </div>
  );
}
