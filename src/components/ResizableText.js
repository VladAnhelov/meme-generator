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
}) => {
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleTransformEnd = () => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const newFontSize = fontSize * Math.max(scaleX, scaleY);

    node.scaleX(1);
    node.scaleY(1);
    node.fontSize(newFontSize);

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
        fill="#fff"
        shadowBlur={2}
        shadowColor="#000"
        shadowOffsetX={2}
        shadowOffsetY={2}
        draggable
        ref={shapeRef}
        onClick={onTextClick}
        onTap={onTextClick}
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
