import React, { useRef } from "react";
import CanvasMemeComponent from "./CanvasMemeComponent.js";

export default function DownloadMemeComponent({
  meme,
  topTextPosition,
  bottomTextPosition,
}) {
  const canvasRef = useRef(null);
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
      <CanvasMemeComponent
        meme={meme}
        topTextPosition={topTextPosition}
        bottomTextPosition={bottomTextPosition}
        canvasRef={canvasRef}
      />
      <button className="download--button" onClick={handleDownloadClick}>
        Download Meme
      </button>
    </div>
  );
}
