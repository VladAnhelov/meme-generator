import React, { useState, useEffect, useCallback } from "react";
import MemeText from "./MemeText.js";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import WaterMark from "./WaterMark.js";
import { v4 as uuidv4 } from "uuid";
import URLImage from "./URLImage.js";
import EraserKonva from "./EraserKonva.js";

export default function CanvasMemeComponent(props) {
  const {
    stageRef,
    meme,
    topTextPosition,
    bottomTextPosition,
    topTextRotation,
    bottomTextRotation,
    additionalTexts,
    images,
    setImages,
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

  const [selectedId, selectShape] = React.useState(null);
  // Додайте isErasing стан
  const [isErasing, setIsErasing] = useState(false);

  // Функція для перемикання режиму стирання
  const toggleEraser = () => {
    setIsErasing(!isErasing);
  };
  // const stage = stageRef.current?.getStage();
  const [stageSpec] = useState({
    scale: 1.2,
    x: 0,
    y: 0,
  });
  const dragUrl = React.useRef();

  //Задає розміри сцени, обмежуючи їх максимальною шириною та висотою.
  //Це допомагає забезпечити, що зображення не будуть занадто великими на канвасі.
  const setDimensionsWithMaxWidth = (width, height) => {
    const maxWidth = 773;
    const maxHeight = 788;

    let newWidth = width;
    let newHeight = height;

    if (height > maxHeight || width > maxWidth) {
      const aspectRatio = width / height;

      if (height >= width) {
        newHeight = maxHeight;
        newWidth = newHeight * aspectRatio;
      } else {
        newWidth = maxWidth;
        newHeight = newWidth * aspectRatio;
      }
    }

    setSceneWidth(newWidth);
    setSceneHeight(newHeight);
  };
  //Завантажує зображення та встановлює розміри сцени на основі розмірів завантаженого зображення.
  const getImageWidth = useCallback((imageUrl) => {
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      setDimensionsWithMaxWidth(image.naturalWidth, image.naturalHeight);
    };
  }, []);

  // Завантажує зображення, змінює його розмір та слухає подію зміни розміру вікна,
  //щоб коректно масштабувати зображення та відповідні елементи.
  useEffect(() => {
    if (!imageElement) return;
    const handleResize = () => {
      const containerImage = document.querySelector(".canvas-container");
      const containerImageWidth = containerImage.offsetWidth;
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

  // Відповідає за встановлення випадкового зображення мему,
  //визначення його ширини та висоти, а також завантаження зображення на сцену.
  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageElement(image);
    };
    image.src = meme.randomImage;
    image.setAttribute("crossorigin", "anonymous");
    getImageWidth(meme.randomImage);
  }, [meme.randomImage, getImageWidth]);

  // Видаляє елемент зі списку зображень за індексом.
  const handleRemove = (index) => {
    const newList = images.filter((item) => item.index !== index);

    setImages(newList);
  };

  //Знімає виділення з фігури, якщо користувач клікнув на порожній області сцени.
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  //Знімає виділення з фігури.
  const unSelectShape = (prop) => {
    selectShape(prop);
  };

  //Видаляє зображення зі списку зображень за вказаним вузлом.
  const onDeleteImage = (node) => {
    const newImages = [...images];
    newImages.splice(node.index, 1);
    setImages(newImages);
  };

  // Обробляє подію введення перетягування на сцену.
  const handleDragEnter = (e) => {
    e.preventDefault();
  };
  //Обробляє подію перетягування над сценою.
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  //Обробляє подію відпускання (відкидання) перетягування на сцені. Додає зображення на канвас у відповідному місці.
  const handleDrop = (e) => {
    e.preventDefault();

    // Check if dragUrl is not null
    if (dragUrl) {
      const img = new window.Image();
      img.src = dragUrl;
      img.onload = () => {
        setImages(
          images.concat([
            {
              id: uuidv4(),
              src: img.src,
              x: e.clientX - img.width / 2,
              y: e.clientY - img.height / 2,
            },
          ]),
        );
      };
    }

    // Get the dropped image src from the dataTransfer
    const droppedImageSrc = e.dataTransfer.getData("imageSrc");

    // Check if the droppedImageSrc is not empty
    if (droppedImageSrc) {
      // Use the droppedImageSrc if it's available
      stageRef.current.setPointersPositions(e);
      setImages([
        ...images,
        {
          ...stageRef.current.getPointerPosition(),
          src: droppedImageSrc,
          id: uuidv4(),
        },
      ]);
    } else {
      // If droppedImageSrc is empty, use the default dragUrl.current value
      stageRef.current.setPointersPositions(e);
      setImages([
        ...images,
        {
          ...stageRef.current.getPointerPosition(),
          src: dragUrl.current,
          id: uuidv4(),
        },
      ]);
    }
  };

  // Додає зображення на канвас за координатами курсора миші, коли користувач клікає на сцені.
  const addImageToCanvas = (imageSrc, e) => {
    const stage = stageRef.current.getStage();

    // Перевірте, чи клікнув користувач на сцені, замість перетягування зображення
    if (!stage.isDragging()) {
      setImages((prevImages) => [
        ...prevImages,
        {
          src: imageSrc,
          id: "image-" + new Date().getTime(),
        },
      ]);
    }
  };

  return (
    <div className="canvas-container">
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div
          onDrop={(e) => {
            e.preventDefault();
            const imageSrc = e.dataTransfer.getData("imageSrc");
            addImageToCanvas(imageSrc);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <button onClick={toggleEraser}>{isErasing ? "Draw" : "Erase"}</button>
          <Stage
            width={containerSize.width}
            height={containerSize.height}
            ref={stageRef}
            onContentClick={(e) => {
              e.evt.preventDefault();
              setSelectedText(e.target);
            }}
            scaleX={stageSpec.scale}
            scaleY={stageSpec.scale}
            x={stageSpec.x}
            y={stageSpec.y}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <Layer>
              <KonvaImage
                image={imageElement}
                width={containerSize.width / 1.2}
                height={containerSize.height / 1.2}
                preventDefault={false}
              />
            </Layer>
            <WaterMark />
            <Layer>
              {images.map((image, index) => {
                return (
                  <URLImage
                    image={image}
                    key={index}
                    addImageToCanvas={addImageToCanvas}
                    shapeProps={image}
                    stageScale={stageSpec.scale}
                    isSelected={image === selectedId}
                    unSelectShape={unSelectShape}
                    onClick={handleRemove}
                    onSelect={() => {
                      selectShape(image);
                    }}
                    onChange={(newAttrs) => {
                      const rects = images.slice();
                      rects[index] = newAttrs;
                      setImages(rects);
                    }}
                    onDelete={onDeleteImage}
                  />
                );
              })}
            </Layer>
            <Layer>
              <MemeText
                position={{
                  x: imageElement
                    ? (parseInt(topTextPosition.x) * containerSize.width) /
                      imageElement.naturalWidth
                    : 0,
                  y: imageElement
                    ? (parseInt(topTextPosition.y) * containerSize.height) /
                      imageElement.naturalHeight
                    : 0,
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
                  x: imageElement
                    ? (parseInt(bottomTextPosition.x) * containerSize.width) /
                      imageElement.naturalWidth
                    : 0,
                  y: imageElement
                    ? (parseInt(bottomTextPosition.y) * containerSize.height) /
                      imageElement.naturalHeight
                    : 0,
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
            <Layer>
              <EraserKonva isErasing={isErasing} stageRef={stageRef} />
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
}
