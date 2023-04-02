import React from "react";

export default function MemePreviewBlockUk(props) {
  const url = "https://api.imgur.com/3/account/me/images";
  const token = "02a7154b1bb6296911f0a2de6031103f4b731fb2";

  React.useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.data) {
          props.setAllMemeImages(result.data);
        } else {
          console.log("No data found");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleClick = (imageUrl) => {
    props.setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: imageUrl,
    }));
  };
  return (
    <div className="meme-preview">
      {props.allMemeImages.map((image, index) => (
        <div className="im" key={index}>
          <img
            src={image.link}
            className="im--preview"
            crossOrigin="anonymous"
            alt=""
            onClick={() => handleClick(image.link)}
          />
        </div>
      ))}
    </div>
  );
}
