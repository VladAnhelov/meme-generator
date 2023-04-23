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
    const [img] = useImage(image.src);

    const shapeRef = React.useRef();
    const deleteButton = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
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

    const handleDelete = () => {
      unSelectShape(null);
      onDelete(shapeRef.current);
    };

    return (
      <React.Fragment>
        <KonvaImage
          image={img}
          x={image.x}
          y={image.y}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          // I will use offset to set origin to the center of the image
          offsetX={img ? img.width / 2 : 0}
          offsetY={img ? img.height / 2 : 0}
          zIndex={2}
          draggable
          rotation={shapeProps.rotation || 0}
          {...shapeProps}
          onDragEnd={(e) => {
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onTransformEnd={(e) => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
              rotation: node.rotation(),
            });
          }}
        />
        {isSelected && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
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
                x={shapeRef.current ? shapeRef.current.width() * stageScale : 0}
              />
              <Text
                text="X"
                fontSize={12}
                fontStyle="bold"
                fill="white"
                x={
                  shapeRef.current
                    ? shapeRef.current.width() * stageScale - 4 // Adjust the position to center the X within the circle
                    : -5
                }
                y={-5} // Adjust the position to center the X within the circle
                onClick={handleDelete}
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
        {console.log("images =", images)}
        <Stage
          className="canvas--block"
          width={670}
          height={600}
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
          <Layer zIndex={1}>
            <KonvaImage
              image={imageElement}
              width={containerSize.width}
              height={containerSize.height}
              preventDefault={false}
            />
          </Layer>
          <Layer zIndex={2}>
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
      </div>
    </div>
  );
}
