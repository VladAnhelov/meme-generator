import React, { useRef, useEffect } from "react";
import {
  Group,
  Circle,
  Text,
  Image as KonvaImage,
  Transformer,
} from "react-konva";
import useImage from "use-image";

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

  const shapeRef = useRef();
  const deleteButton = useRef();
  const trRef = useRef();

  const closeCircleX = useRef(0);
  const closeCircleY = useRef(0);
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

  const handleDelete = React.useCallback(
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

  return (
    <React.Fragment>
      <KonvaImage
        image={img}
        x={image.x}
        y={image.y}
        width={70}
        height={70}
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

export default URLImage;
