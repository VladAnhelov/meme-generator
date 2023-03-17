import React, { useRef } from "react";
import CanvasMemeComponent from "./CanvasMemeComponent.js";

export default function DownloadMemeComponent({
  meme,
  topTextPosition,
  bottomTextPosition,
}) {
  const stageRef = useRef(null);
  const handleDownloadClick = () => {
    const dataURL = stageRef.current.toDataURL({
      mimeType: "image/png",
      quality: 1,
    });
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
        stageRef={stageRef}
      />
      <button className="download--button" onClick={handleDownloadClick}>
        Download Meme
      </button>
    </div>
  );
}
