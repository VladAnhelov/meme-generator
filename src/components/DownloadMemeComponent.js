import React, { useEffect, useRef, useState } from "react";

export default function DownloadMemeComponent(props) {
  const { meme, topTextPosition, bottomTextPosition } = props;
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(0);

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
    const context = canvas.getContext("2d");

    const image = new Image();
    image.onload = () => {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      context.fillStyle = "#ffffff";
      context.shadowBlur = 5;
      context.shadowColor = "#000";
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      if (canvas.width < 500) {
        context.font = "20px Impact";
      } else {
        context.font = "40px Impact";
      }
      const topX = Math.round(parseInt(topTextPosition.x));
      const topY = Math.round(parseInt(topTextPosition.y));
      const bottomX = Math.round(parseInt(bottomTextPosition.x));
      const bottomY = Math.round(parseInt(bottomTextPosition.y));
      const topTextX = (topX * canvas.width) / image.naturalWidth;
      const topTextY = (topY * canvas.height) / image.naturalHeight;
      context.fillText(meme.topText.toUpperCase(), topTextX, topTextY);
      const bottomTextX = (bottomX * canvas.width) / image.naturalWidth;
      const bottomTextY = (bottomY * canvas.height) / image.naturalHeight;
      context.fillText(meme.bottomText.toUpperCase(), bottomTextX, bottomTextY);

      console.log("canvas: ", parseInt(topTextX), parseInt(topTextY));
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
