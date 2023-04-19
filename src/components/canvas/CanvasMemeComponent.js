import React, { useState, useEffect, useCallback } from "react";
import MemeText from "./MemeText.js";
import { Stage, Layer, Image as KonvaImage } from "react-konva";

export default function CanvasMemeComponent(props) {
  const {
    stageRef,
    meme,
    topTextPosition,
    bottomTextPosition,
    topTextRotation,
    bottomTextRotation,
    additionalTexts,
  } = props;
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0,
  });
  const [imageElement, setImageElement] = useState(null);
  const [selectedText, setSelectedText] = useState(null);
  const [sceneWidth, setSceneWidth] = useState(570);
  const [sceneHeight, setSceneHeight] = useState(600);
  const [fontSizeTop, setFontSizeTop] = useState(40);
  const [fontSizeBottom, setFontSizeBottom] = useState(40);

  const setDimensionsWithMaxWidth = (width, height) => {
    const maxWidth = 773;
    const maxHeight = 788;

    let newWidth = width;
    let newHeight = height;

    if (height > 1000) {
      const aspectRatio = width / height;
      newHeight = maxHeight;
      newWidth = newHeight * aspectRatio;
    } else if (width > maxWidth) {
      const aspectRatio = height / width;
      newWidth = maxWidth;
      newHeight = newWidth * aspectRatio;
    }

    setSceneWidth(newWidth);
    setSceneHeight(newHeight);
  };

  const getImageWidth = useCallback((imageUrl) => {
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      setDimensionsWithMaxWidth(image.naturalWidth, image.naturalHeight);
    };
  }, []);

  useEffect(() => {
    if (!imageElement) return;
    const handleResize = () => {
      const containerImage = document.querySelector(".canvas--block");
      const containerImageWidth = containerImage.offsetWidth;
      console.log("containerImageWidth:", containerImageWidth);
      const aspectRatio =
        imageElement.naturalWidth / imageElement.naturalHeight;
      const newHeight = containerImageWidth / aspectRatio;
      const scale = containerImageWidth / sceneWidth;

      if (containerImageWidth < 773) {
        setContainerSize({
          width: containerImageWidth,
          height: newHeight,
        });
        setFontSizeTop(30);
        setFontSizeBottom(30);
      } else {
        setContainerSize({
          width: sceneWidth,
          height: sceneHeight,
        });
        setFontSizeTop(40);
        setFontSizeBottom(40);
      }

      if (
        imageElement &&
        imageElement.naturalHeight > 1900 &&
        imageElement.naturalWidth < 900
      ) {
        const maxHeight = 788;
        const aspectRatio =
          imageElement.naturalWidth / imageElement.naturalHeight;
        const newWidth = maxHeight * aspectRatio;
        setFontSizeTop(25);
        setFontSizeBottom(25);

        setContainerSize({
          width: newWidth,
          height: maxHeight,
        });
      }

      setImageElement((prevImageElement) => {
        if (!prevImageElement) {
          return null;
        }
        prevImageElement.width = sceneWidth * scale;
        prevImageElement.height = sceneHeight * scale;
        return prevImageElement;
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [sceneWidth, sceneHeight, imageElement]);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageElement(image);
    };
    image.src = meme.randomImage;
    image.setAttribute("crossorigin", "anonymous");
    getImageWidth(meme.randomImage);
  }, [meme.randomImage, getImageWidth]);

  return (
    <Stage
      className="canvas--block"
      width={containerSize.width}
      height={containerSize.height}
      ref={stageRef}
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
          preventDefault={false}
        />
        <MemeText
          position={{
            x:
              imageElement &&
              (parseInt(topTextPosition.x) * containerSize.width) /
                imageElement.naturalWidth,
            y:
              imageElement &&
              (parseInt(topTextPosition.y) * containerSize.height) /
                imageElement.naturalHeight,
          }}
          rotation={topTextRotation}
          text={meme.topText.toUpperCase()}
          fontSize={fontSizeTop}
          fillColor={props.selectedColor}
          selectedText={selectedText}
          setSelectedText={setSelectedText}
        />
        <MemeText
          position={{
            x:
              imageElement &&
              (parseInt(bottomTextPosition.x) * containerSize.width) /
                imageElement.naturalWidth,
            y:
              imageElement &&
              (parseInt(bottomTextPosition.y) * containerSize.height) /
                imageElement.naturalHeight,
          }}
          rotation={bottomTextRotation}
          text={meme.bottomText.toUpperCase()}
          fontSize={fontSizeBottom}
          fillColor={props.selectedColor}
          selectedText={selectedText}
          setSelectedText={setSelectedText}
        />
        {additionalTexts.map((text, index) => (
          <MemeText
            key={index}
            position={{
              x: 30,
              y: 70 + 50 * index,
            }}
            rotation={0}
            text={text.toUpperCase()}
            fontSize={30}
            fillColor={props.selectedColor}
            selectedText={selectedText}
            setSelectedText={setSelectedText}
          />
        ))}
      </Layer>
    </Stage>
  );
}