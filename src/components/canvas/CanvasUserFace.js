import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import EraserKonva from "./EraserKonva";

const CanvasUserFace = forwardRef(({ src, isErasing }, ref) => {
  const stageRef = React.useRef();

  const [imageElement, setImageElement] = useState(null);

  React.useEffect(() => {
    if (src) {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setImageElement(img);
      };
    }
  }, [src]);
  // Додайте функцію збереження зображення
  useImperativeHandle(ref, () => ({
    saveImage: () => {
      const stage = stageRef.current.getStage();
      const dataUrl = stage.toDataURL();
      return dataUrl;
    },
  }));

  return (
    <div>
      <Stage ref={stageRef} width={130} height={130}>
        <Layer>
          {imageElement && (
            <KonvaImage image={imageElement} width={130} height={130} />
          )}
          <EraserKonva isErasing={isErasing} stageRef={stageRef} />
        </Layer>
      </Stage>
    </div>
  );
});

export default CanvasUserFace;
