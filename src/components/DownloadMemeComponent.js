import React, { useState } from "react";

export default function DownloadMemeComponent(props) {
  const [clicked, setClicked] = useState(false);

  const handleDownloadClick = () => {
    setClicked(true);

    const dataURL = props.stageRef.current.toDataURL({
      mimeType: "image/png",
      quality: 1,
    });
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = dataURL;
    setTimeout(() => {
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);

    setTimeout(() => {
      setClicked(false);
    }, 1000);
  };

  return (
    <div className="download">
      <button
        className={`download-btn ${clicked ? "clicked" : ""}`}
        onClick={handleDownloadClick}
      >
        {clicked ? (
          ""
        ) : (
          <>
            <p className="text--button">Download Meme</p>
            <img
              src={`${process.env.PUBLIC_URL}/download-icon.png`}
              alt="Download"
              className="download-icon"
            />
          </>
        )}
      </button>
    </div>
  );
}
