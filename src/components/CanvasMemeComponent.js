import React, { useEffect, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Text } from "react-konva";

import Konva from "konva";

export default function CanvasMemeComponent(props) {
  const { stageRef, meme, topTextPosition, bottomTextPosition } = props;
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [imageElement, setImageElement] = useState(null);

  useEffect(() => {
    const container = document.querySelector(".meme--image");
    if (!container) {
      console.error(".meme--image selector did not match any elements");
      return;
    }

    const handleResize = () => {
      setContainerSize({
        width: container.offsetWidth,
        height: container.offsetHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const image = document.querySelector(".meme--image");
    image.onload = () => {
      setImageElement(image);
    };
    image.src = meme.randomImage;
    image.setAttribute("crossorigin", "anonymous");
  }, [meme.randomImage]);

  const getTextFontSize = () => (containerSize.width < 500 ? 20 : 40);

  return (
    <Stage
      width={containerSize.width}
      height={containerSize.height}
      ref={stageRef}
    >
      <Layer>
        <KonvaImage
          image={imageElement}
          width={containerSize.width}
          height={containerSize.height}
        />

        <Text
          x={
            imageElement
              ? (parseInt(topTextPosition.x) * containerSize.width) /
                imageElement.naturalWidth
              : 0
          }
          y={
            imageElement
              ? (parseInt(topTextPosition.y) * containerSize.height) /
                imageElement.naturalHeight
              : 0
          }
          text={meme.topText.toUpperCase()}
          fontFamily="Impact"
          fontSize={getTextFontSize()}
          fill="#fff"
          shadowBlur={5}
          shadowColor="#000"
          shadowOffsetX={2}
          shadowOffsetY={2}
        />
        <Text
          x={
            imageElement
              ? (parseInt(bottomTextPosition.x) * containerSize.width) /
                imageElement.naturalWidth
              : 0
          }
          y={
            imageElement
              ? (parseInt(bottomTextPosition.y) * containerSize.height) /
                imageElement.naturalHeight
              : 0
          }
          text={meme.bottomText.toUpperCase()}
          fontFamily="Impact"
          fontSize={getTextFontSize()}
          fill="#fff"
          shadowBlur={5}
          shadowColor="#000"
          shadowOffsetX={2}
          shadowOffsetY={2}
        />
      </Layer>
    </Stage>
  );
}
