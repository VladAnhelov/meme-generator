import React from "react";

export default function DownloadMemeComponent({ canvasRef }) {
  const handleDownloadClick = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
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
