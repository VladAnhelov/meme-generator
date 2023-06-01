import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import EraserKonva from "./CanvasEraserKonva";

const CanvasUserFace = forwardRef(({ src, isErasing }, ref) => {
  const stageRef = React.useRef();

  const [imageElement, setImageElement] = useState(null);
  const [scale, setScale] = useState(1);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [isStageDraggable, setIsStageDraggable] = useState(true);

  const [eraserSize, setEraserSize] = useState(20); // Initial eraser size

  const increaseEraserSize = () => {
    setEraserSize((prevSize) => prevSize + 5); // Increase eraser size by 5
  };

  const decreaseEraserSize = () => {
    setEraserSize((prevSize) => (prevSize > 5 ? prevSize - 5 : prevSize)); // Decrease eraser size by 5, but not less than 5
  };

  React.useEffect(() => {
    setIsStageDraggable(!isErasing);
  }, [isErasing]);

  const pushStateToHistory = (dataUrl) => {
    setHistory((prevHistory) => {
      const newHistory = prevHistory.slice(0, historyIndex + 1);
      newHistory.push(dataUrl);
      return newHistory;
    });
    setHistoryIndex((prevIndex) => prevIndex + 1);
  };

  const undo = () => {
    console.log("Undo called");
    if (historyIndex > 0) {
      setHistoryIndex((prevIndex) => prevIndex - 1);
      const img = new window.Image();
      img.src = history[historyIndex - 1];
      img.onload = () => {
        setImageElement(img);
      };
    }
  };

  const redo = () => {
    console.log("Redo called");
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prevIndex) => prevIndex + 1);
      const img = new window.Image();
      img.src = history[historyIndex + 1];
      img.onload = () => {
        setImageElement(img);
      };
    }
  };

  React.useEffect(() => {
    console.log("Src changed:", src);
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
      const dataUrl = stage.toDataURL({ pixelRatio: 5 });
      return dataUrl;
    },
    zoomIn: () => {
      setScale((prevScale) => prevScale + 0.1);
    },
    zoomOut: () => {
      setScale((prevScale) => prevScale - 0.1);
    },
    undo: () => {
      undo();
    },
    redo: () => {
      redo();
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
    ctx.arc(70, 70, 70, 0, Math.PI * 2, true);
    ctx.clip();
  };

  return (
    <>
      <Stage
        ref={stageRef}
        width={140}
        height={140}
        onWheel={handleWheel}
        draggable={isStageDraggable}
      >
        <Layer scale={{ x: scale, y: scale }} clipFunc={clipCircle}>
          {imageElement && (
            <KonvaImage image={imageElement} width={140} height={140} />
          )}
          <EraserKonva
            isErasing={isErasing}
            stageRef={stageRef}
            pushStateToHistory={pushStateToHistory}
            eraserSize={eraserSize}
            scale={scale}
          />
        </Layer>
      </Stage>
      <button onClick={increaseEraserSize}>+</button>
      <button onClick={decreaseEraserSize}>-</button>
    </>
  );
});

export default CanvasUserFace;
