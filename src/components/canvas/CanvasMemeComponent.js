import React, { useState, useEffect, useCallback } from "react";
import MemeText from "./MemeText.js";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Transformer,
  Circle,
  Group,
  Text,
} from "react-konva";
import useImage from "use-image";
import { v4 as uuidv4 } from "uuid";

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

  const [images, setImages] = React.useState([]);
  const [selectedId, selectShape] = React.useState(null);

  // const stage = stageRef.current?.getStage();
  const [stageSpec] = useState({
    scale: 1.2,
    x: 0,
    y: 0,
  });
  const dragUrl = React.useRef();

  const URLImage = ({
    image,
    shapeProps,
    unSelectShape,
    isSelected,
    onSelect,
    onChange,
    stageScale,
    onDelete,
  }) => {
    const [img] = useImage(image.src, "Anonymous");

    const shapeRef = React.useRef();
    const deleteButton = React.useRef();
    const trRef = React.useRef();

    const closeCircleX = React.useRef(0);
    const closeCircleY = React.useRef(0);
    const mirrored = shapeProps.scaleX < 0 || shapeProps.scaleY < 0;

    useEffect(() => {
      if (isSelected) {
        const node = shapeRef.current;
        const width = node.width() * node.scaleX();
        const height = node.height() * node.scaleY();

        closeCircleX.current = width * stageScale;
        closeCircleY.current = (-height * stageScale) / 150;
      }
    }, [isSelected, stageScale]);

    useEffect(() => {
      if (isSelected) {
        // we need to attach transformer manually
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();
      }
    }, [isSelected]);

    const onMouseEnter = (event) => {
      if (isSelected) {
        event.target.getStage().container().style.cursor = "move";
      }
      if (!isSelected) {
        event.target.getStage().container().style.cursor = "pointer";
      }
    };

    const onMouseLeave = (event) => {
      event.target.getStage().container().style.cursor = "default";
    };

    const handleDelete = useCallback(
      (event) => {
        if (onDelete) {
          unSelectShape(null);
          onDelete(shapeRef.current);
          if (event && event.target) {
            event.target.getStage().container().style.cursor = "default";
          }
        }
      },
      [onDelete, unSelectShape],
    );

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "Backspace" || e.key === "Delete") {
          if (isSelected) {
            handleDelete();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isSelected, handleDelete]);

    const handleTransformEnd = () => {
      const node = shapeRef.current;

      if (!node) {
        return;
      }
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();

      console.log("scaleX:", Math.round(scaleX), "scaleY:", Math.round(scaleY));

      let newWidth = node.width();
      let newHeight = node.height();

      console.log(
        "Initial newWidth:",
        Math.round(newWidth),
        "Initial newHeight:",
        Math.round(newHeight),
      );

      const newPosition = {
        x: node.x(),
        y: node.y(),
      };

      const rotation = ((node.rotation() % 360) + 360) % 360;

      onChange({
        ...shapeProps,
        x: newPosition.x,
        y: newPosition.y,
        width: newWidth,
        height: newHeight,
        rotation: rotation,
        scaleX: scaleX,
        scaleY: scaleY,
      });

      console.log(
        "newPositionX:",
        Math.round(newPosition.x),
        "newPositionY:",
        Math.round(newPosition.y),
      );

      console.log(
        "Final newWidth:",
        Math.round(newWidth),
        "Final newHeight:",
        Math.round(newHeight),
      );
      console.log(
        Math.round(newWidth),
        Math.round(newHeight),
        Math.round(rotation),
      );
    };

    // for mobile test
    useEffect(() => {
      let lastDist = 0;
      let isDragging = false;
      const node = shapeRef.current;

      if (node) {
        const stage = node.getStage();

        stage.content.addEventListener("touchstart", (e) => {
          e.preventDefault();

          if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            lastDist = Math.sqrt(
              Math.pow(touch1.clientX - touch2.clientX, 2) +
                Math.pow(touch1.clientY - touch2.clientY, 2),
            );
          } else {
            isDragging = true;
          }
        });

        stage.content.addEventListener("touchmove", (e) => {
          e.preventDefault();

          if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const dist = Math.sqrt(
              Math.pow(touch1.clientX - touch2.clientX, 2) +
                Math.pow(touch1.clientY - touch2.clientY, 2),
            );

            const scale = node.scaleX() * (dist / lastDist);

            node.scaleX(scale);
            node.scaleY(scale);

            lastDist = dist;
          } else if (isDragging) {
            const touch = e.touches[0];

            node.position({
              x: touch.clientX - node.width() / 2,
              y: touch.clientY - node.height() / 2,
            });

            stage.batchDraw();
          }
        });

        stage.content.addEventListener("touchend", () => {
          isDragging = false;
        });
      }
    }, []);

    // for mobile test
    useEffect(() => {
      const stage = shapeRef.current.getStage();
      if (stage) {
        stage.on("mousedown touchstart", (e) => {
          if (e.target === stage) {
            unSelectShape(null);
          }
        });
      }
    }, [unSelectShape]);

    return (
      <React.Fragment>
        <KonvaImage
          image={img}
          x={image.x}
          y={image.y}
          width={100}
          height={100}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onSelect}
          onTap={onSelect}
          onTransformEnd={handleTransformEnd}
          ref={shapeRef}
          offsetX={img ? img.width / 1.5 : 0}
          offsetY={img ? img.height / 1.5 : 0}
          scaleX={shapeProps.scaleX || 1}
          scaleY={shapeProps.scaleY || 1}
          draggable={true}
          rotation={shapeProps.rotation || 0}
          {...shapeProps}
          onDragEnd={(e) => {
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
        />

        {isSelected && (
          <Transformer
            ref={trRef}
            anchorSize={mirrored ? -12 : 12}
            borderDash={[mirrored ? 10 : 0, 0]}
          >
            <Group
              onMouseEnter={(e) => {
                e.target.getStage().container().style.cursor = "pointer";
              }}
              onMouseLeave={(e) => {
                e.target.getStage().container().style.cursor = "default";
              }}
            >
              <Circle
                radius={9}
                fill="#db4949"
                stroke="#4781c1"
                strokeWidth={2}
                ref={deleteButton}
                onClick={handleDelete}
                onTap={handleDelete}
              />
              <Text
                text="X"
                fontSize={12}
                fontStyle="bold"
                fill="white"
                x={-4}
                y={-5}
                onClick={handleDelete}
                onTap={handleDelete}
              />
            </Group>
          </Transformer>
        )}
      </React.Fragment>
    );
  };

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

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageElement(image);
    };
    image.src = meme.randomImage;
    image.setAttribute("crossorigin", "anonymous");
    getImageWidth(meme.randomImage);
  }, [meme.randomImage, getImageWidth]);

  const handleRemove = (index) => {
    const newList = images.filter((item) => item.index !== index);

    setImages(newList);
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const unSelectShape = (prop) => {
    selectShape(prop);
  };

  const onDeleteImage = (node) => {
    const newImages = [...images];
    newImages.splice(node.index, 1);
    setImages(newImages);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

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

  const addImageToCanvas = (imageSrc, e) => {
    const stage = stageRef.current.getStage();
    const point = stage.getPointerPosition();

    setImages((prevImages) => [
      ...prevImages,
      {
        src: imageSrc,
        x: point.x,
        y: point.y,
        id: "image-" + new Date().getTime(),
      },
    ]);
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
            <Layer>
              {images.map((image, index) => {
                return (
                  <URLImage
                    image={image}
                    key={index}
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
          </Stage>
        </div>
      </div>
    </div>
  );
}
