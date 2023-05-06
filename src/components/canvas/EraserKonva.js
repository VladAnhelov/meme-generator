import { useEffect, useCallback } from "react";
import styles from "/Users/vladanhelov/Desktop/meme-generator/src/components/main/memeConfig/AddFaceByUserModal.module.scss";
import Konva from "konva";

const EraserKonva = ({ isErasing, stageRef, pushStateToHistory }) => {
  const getRelativePointerPosition = (node) => {
    const transform = node.getAbsoluteTransform().copy();
    transform.invert();
    const pos = node.getStage().getPointerPosition();
    return transform.point(pos);
  };

  const handleMouseDown = useCallback(() => {
    if (!isErasing) return;

    const stage = stageRef.current;
    const layer = stage.findOne("Layer");

    // Зберегти поточний стан перед застосуванням гумки
    pushStateToHistory(stage.toDataURL());

    const eraserLine = new Konva.Line({
      stroke: "white",
      strokeWidth: 20,
      lineCap: "round",
      lineJoin: "round",
      tension: 4.5,
      globalCompositeOperation: "destination-out",
      draggable: false,
    });

    const pos = getRelativePointerPosition(layer);
    eraserLine.points([pos.x, pos.y]);
    layer.add(eraserLine);
    layer.draw();

    return eraserLine;
  }, [isErasing, stageRef, pushStateToHistory]);

  const handleMouseMove = useCallback(
    (eraserLine) => {
      if (!isErasing || stageRef.current.isDragging() || !eraserLine) return;

      const stage = stageRef.current;
      const layer = stage.findOne("Layer");
      const pos = getRelativePointerPosition(layer);
      const newPoints = eraserLine.points().concat([pos.x, pos.y]);
      eraserLine.points(newPoints);
      layer.batchDraw();
    },
    [isErasing, stageRef],
  );

  const handleMouseUp = useCallback(() => {
    if (!isErasing) return;

    const stage = stageRef.current;
    const layer = stage.findOne("Layer");
    layer.draw();
    stage.off("mousemove touchmove");
  }, [isErasing, stageRef]);

  useEffect(() => {
    if (!isErasing) return;

    const stage = stageRef.current;
    const container = stage.container();
    if (isErasing) {
      container.classList.add(styles.custom_cursor);
    } else {
      container.classList.remove(styles.custom_cursor);
    }

    stage.on("mousedown touchstart", (e) => {
      const eraserLine = handleMouseDown();
      stage.on("mousemove touchmove", (e) => {
        handleMouseMove(eraserLine);
      });
      stage.on("mouseup touchend", (e) => {
        handleMouseUp();
        stage.off("mouseup touchend");
      });
    });

    return () => {
      stage.off("mousedown touchstart");
      stage.container().classList.remove(styles.custom_cursor);
    };
  }, [
    isErasing,
    stageRef,
    pushStateToHistory,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  ]);

  return null;
};

export default EraserKonva;
