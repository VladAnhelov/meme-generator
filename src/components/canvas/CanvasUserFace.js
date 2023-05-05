import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import EraserKonva from "./EraserKonva";

const CanvasUserFace = forwardRef(({ src, isErasing }, ref) => {
  const stageRef = React.useRef();

  const [imageElement, setImageElement] = useState(null);
  const [scale, setScale] = useState(1);

  React.useEffect(() => {
    if (src) {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setImageElement(img);
      };
    }
  }, [src]);

  // Додайте функції зуму
  useImperativeHandle(ref, () => ({
    saveImage: () => {
      const stage = stageRef.current.getStage();
      const dataUrl = stage.toDataURL();
      return dataUrl;
    },
    zoomIn: () => {
      setScale((prevScale) => prevScale + 0.1);
    },
    zoomOut: () => {
      setScale((prevScale) => prevScale - 0.1);
    },
  }));

  const handleWheel = (e) => {
    e.evt.preventDefault();

    const scaleBy = 1.1;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();

    const pointer = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    stage.position(newPos);
    stage.batchDraw();

    setScale(newScale);
  };

  // Функція для обрізки зображення у круглому контурі
  const clipCircle = (ctx) => {
    ctx.beginPath();
    ctx.arc(65, 65, 65, 0, Math.PI * 2, true);
    ctx.clip();
  };

  return (
    <>
      <Stage
        ref={stageRef}
        width={130}
        height={130}
        onWheel={handleWheel}
        scaleX={scale}
        scaleY={scale}
        draggable
      >
        <Layer scale={{ x: scale, y: scale }} clipFunc={clipCircle}>
          {imageElement && (
            <KonvaImage image={imageElement} width={130} height={130} />
          )}
          <EraserKonva isErasing={isErasing} stageRef={stageRef} />
        </Layer>
      </Stage>
    </>
  );
});

export default CanvasUserFace;
