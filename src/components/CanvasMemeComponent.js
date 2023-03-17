import React, { useState, useEffect } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Text,
  Transformer,
} from "react-konva";

export default function CanvasMemeComponent(props) {
  const {
    stageRef,
    meme,
    topTextPosition,
    bottomTextPosition,
    topTextRotation,
    bottomTextRotation,
  } = props;
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0,
  });
  const [imageElement, setImageElement] = useState(null);
  const [selectedText, setSelectedText] = useState(null);

  useEffect(() => {
    const container = document.querySelector(".meme--image");
    if (!container) {
      console.error(".meme--image selector did not match any elements");
      return;
    }

    const handleResize = () => {
      setContainerSize({
        width: 568,
        height: 550,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageElement(image);
    };
    image.src = meme.randomImage;
    image.setAttribute("crossorigin", "anonymous");
  }, [meme.randomImage]);

  const handleTextClick = (e) => {
    setSelectedText(e.target);
  };

  return (
    <Stage
      width={containerSize.width}
      height={containerSize.height}
      ref={stageRef}
      onClick={() => setSelectedText(null)}
      onContentClick={(e) => {
        e.evt.preventDefault();
        setSelectedText(e.target);
      }}
    >
      <Layer>
        <KonvaImage
          image={imageElement}
          width={containerSize.width}
          height={containerSize.height}
        />

        <Text
          x={
            imageElement &&
            (parseInt(topTextPosition.x) * containerSize.width) /
              imageElement.naturalWidth
          }
          y={
            imageElement &&
            (parseInt(topTextPosition.y) * containerSize.height) /
              imageElement.naturalHeight
          }
          rotation={topTextRotation}
          text={meme.topText.toUpperCase()}
          fontFamily="Impact"
          fontSize={containerSize.width < 500 ? 20 : 40}
          fill="#fff"
          shadowBlur={5}
          shadowColor="#000"
          shadowOffsetX={2}
          shadowOffsetY={2}
          draggable
          onClick={handleTextClick}
        />
        {selectedText === null ? null : (
          <Transformer
            selectedNode={selectedText}
            keepRatio={false}
            resizeEnabled
            rotateEnabled
            anchorSize={10}
            anchorCornerRadius={5}
            borderStrokeWidth={1}
            borderDash={[3, 3]}
          />
        )}
        <Text
          x={
            imageElement &&
            (parseInt(bottomTextPosition.x) * containerSize.width) /
              imageElement.naturalWidth
          }
          y={
            imageElement &&
            (parseInt(bottomTextPosition.y) * containerSize.height) /
              imageElement.naturalHeight
          }
          rotation={bottomTextRotation}
          text={meme.bottomText.toUpperCase()}
          fontFamily="Impact"
          fontSize={containerSize.width < 500 ? 20 : 40}
          fill="#fff"
          shadowBlur={5}
          shadowColor="#000"
          shadowOffsetX={2}
          shadowOffsetY={2}
          draggable
          onClick={handleTextClick}
        />
        {selectedText === null ? null : (
          <Transformer
            selectedNode={selectedText}
            keepRatio={false}
            resizeEnabled
            rotateEnabled
            anchorSize={10}
            anchorCornerRadius={5}
            borderStrokeWidth={1}
            borderDash={[3, 3]}
          />
        )}
      </Layer>
    </Stage>
  );
}
