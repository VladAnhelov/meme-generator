import React, { useRef } from "react";
import ResizableText from "./CanvasResizableText.js";

const CanvasMemeText = ({
  position,
  rotation,
  text,
  fontSize,
  selectedText,
  setSelectedText,
  fillColor,
}) => {
  const shapeRef = useRef();

  const deselectText = () => {
    setSelectedText(null);
  };

  const handleTextClick = (e) => {
    const node = e.target;
    if (node === shapeRef.current) {
      setSelectedText(node);
    } else {
      setSelectedText(null);
    }
  };

  return (
    <ResizableText
      position={position}
      rotation={rotation}
      text={text}
      fontSize={fontSize}
      fillColor={fillColor}
      shapeRef={shapeRef}
      onTextClick={handleTextClick}
      isSelected={selectedText === shapeRef.current}
      onDeselect={deselectText}
    />
  );
};

export default CanvasMemeText;
