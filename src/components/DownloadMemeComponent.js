import React from "react";

export default function DownloadMemeComponent(props) {
  let downloadBtn = document.getElementById("downloadBtn");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", (event) => {
      let btn = event.target;
      btn.classList.add("clicked");
      btn.textContent = "";

      setTimeout(() => {
        btn.classList.remove("clicked");
        btn.textContent = "Download Meme";
      }, 1000);
    });
  }

  const handleDownloadClick = () => {
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
  };

  return (
    <div className="form">
      <button
        className="download-btn"
        id="downloadBtn"
        onClick={handleDownloadClick}
      >
        Download Meme
      </button>
    </div>
  );
}
