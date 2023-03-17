import React from "react";

export default function DownloadMemeComponent(props) {
  const handleDownloadClick = () => {
    const dataURL = props.stageRef.current.toDataURL({
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
      <button className="download--button" onClick={handleDownloadClick}>
        Download Meme
      </button>
    </div>
  );
}
