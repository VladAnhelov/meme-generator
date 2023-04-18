// eslint-disable-next-line
import React, { useEffect, useRef } from "react";
import { Text, Transformer } from "react-konva";

const ResizableText = ({
  position,
  rotation,
  text,
  fontSize,
  shapeRef,
  onTextClick,
  isSelected,
  onDeselect,
  fillColor,
}) => {
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleTransform = () => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    const newFontSize = fontSize * Math.max(scaleX, scaleY);
    node.fontSize(newFontSize);
  };

  const handleTransformEnd = () => {
    onDeselect();
  };

  return (
    <>
      <Text
        x={position.x}
        y={position.y}
        rotation={rotation}
        text={text}
        fontFamily="Impact"
        fontSize={fontSize}
        fill={fillColor}
        shadowBlur={2}
        shadowColor="#000"
        shadowOffsetX={0}
        shadowOffsetY={0}
        draggable
        ref={shapeRef}
        onClick={onTextClick}
        onTap={onTextClick}
        handleTransform={handleTransform}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          keepRatio={true}
          resizeEnabled
          rotateEnabled
          anchorSize={10}
          anchorCornerRadius={5}
          borderStrokeWidth={1}
          borderDash={[3, 3]}
          attachedTo={shapeRef.current}
        />
      )}
    </>
  );
};

export default ResizableText;
