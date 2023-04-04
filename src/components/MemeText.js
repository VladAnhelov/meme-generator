import React, { useRef } from "react";
import ResizableText from "./ResizableText.js";

const MemeText = ({
  position,
  rotation,
  text,
  fontSize,
  selectedText,
  setSelectedText,
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
      shapeRef={shapeRef}
      onTextClick={handleTextClick}
      isSelected={selectedText === shapeRef.current}
      onDeselect={deselectText}
    />
  );
};

export default MemeText;
