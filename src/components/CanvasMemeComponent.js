import React, { useState, useEffect, useRef } from "react";
import {
  Stage,
  Layer,
  Text,
  Transformer,
  Image as KonvaImage,
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
  const [fontSizeTop, setFontSizeTop] = useState(40);
  const [fontSizeBottom, setFontSizeBottom] = useState(40);
  const [nodes, setNodes] = useState([]);
  const shapeRefTop = useRef();
  const shapeRefBottom = useRef();
  const trRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const sceneWidth = 570;
      const sceneHeight = 600;
      const containerImage = document.querySelector(".canvas--block");
      const containerImageWidth = containerImage.offsetWidth;
      const scale = containerImageWidth / sceneWidth;

      if (containerImageWidth < 574) {
        setContainerSize({
          width: containerImageWidth,
          height: containerImageWidth < 390 ? 300 : 400,
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
    const node = e.target;

    if (node === shapeRefTop.current) {
      setSelectedText("top");
    } else if (node === shapeRefBottom.current) {
      setSelectedText("bottom");
    } else {
      setSelectedText(null);
    }
    if (selectedText) {
      trRef.current.attachTo(node);
      trRef.current.getLayer().batchDraw();
    }
  };

  const handleTransform = (e) => {
    const node =
      selectedText === "top" ? shapeRefTop.current : shapeRefBottom.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const fontSize = node.fontSize();

    node.scaleX(1);
    node.scaleY(1);

    setSelectedText({
      ...selectedText,
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
    });

    const newFontSize = fontSize * Math.max(scaleX, scaleY);
    node.fontSize(newFontSize);
  };

  const handleTransformEnd = (e) => {
    const node =
      selectedText === "top" ? shapeRefTop.current : shapeRefBottom.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const fontSize = node.fontSize();

    node.scaleX(1);
    node.scaleY(1);

    setSelectedText({
      ...selectedText,
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
    });

    switch (selectedText) {
      case "top":
        setFontSizeTop(fontSize * Math.max(scaleX, scaleY));
        break;
      case "bottom":
        setFontSizeBottom(fontSize * Math.max(scaleX, scaleY));
        break;
    }
    setSelectedText(null);
    node.fontSize(fontSize * Math.max(scaleX, scaleY));
  };

  const handleDragMove = (e) => {
    const node = e.target;
    const newNodes = nodes.slice();
    newNodes[0] = {
      ...newNodes[0],
      x: node.x(),
      y: node.y(),
    };
    setNodes(newNodes);
  };

  const handleDragEnd = () => {
    setNodes([]);
  };

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
          fontSize={fontSizeTop}
          fill="#fff"
          shadowBlur={2}
          shadowColor="#000"
          shadowOffsetX={2}
          shadowOffsetY={2}
          draggable
          ref={shapeRefTop}
          onClick={handleTextClick}
          onTransform={handleTransform}
          onTransformEnd={handleTransformEnd}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        />
        {selectedText === null ? null : (
          <Transformer
            selectedNode={selectedText}
            ref={trRef}
            keepRatio={true}
            resizeEnabled
            rotateEnabled
            anchorSize={10}
            anchorCornerRadius={5}
            borderStrokeWidth={1}
            borderDash={[3, 3]}
            onTransform={handleTransform}
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
          fontSize={fontSizeBottom}
          fill="#fff"
          shadowBlur={5}
          shadowColor="#000"
          shadowOffsetX={2}
          shadowOffsetY={2}
          draggable
          ref={shapeRefBottom}
          onClick={handleTextClick}
          onTransform={handleTransform}
          onTransformEnd={handleTransformEnd}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
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
