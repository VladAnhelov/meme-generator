import { useEffect } from "react";
import Konva from "konva";

const EraserKonva = ({ isErasing, stageRef }) => {
  useEffect(() => {
    if (!isErasing) return;

    const stage = stageRef.current;
    const layer = stage.findOne("Layer");

    stage.container().style.cursor = isErasing ? "crosshair" : "default";

    const getRelativePointerPosition = (node) => {
      const transform = node.getAbsoluteTransform().copy();
      transform.invert();
      const pos = node.getStage().getPointerPosition();
      return transform.point(pos);
    };

    stage.on("mousedown touchstart", () => {
      if (!isErasing) return;

      const eraserLine = new Konva.Line({
        stroke: "white",
        strokeWidth: 10,
        lineCap: "round",
        lineJoin: "round",
        tension: 0.5,
        globalCompositeOperation: "destination-out",
        draggable: false,
      });

      const pos = getRelativePointerPosition(layer);
      eraserLine.points([pos.x, pos.y]);
      layer.add(eraserLine);
      layer.draw();

      stage.on("mousemove touchmove", () => {
        if (!isErasing || stage.isDragging()) return;

        const pos = getRelativePointerPosition(layer);
        const newPoints = eraserLine.points().concat([pos.x, pos.y]);
        eraserLine.points(newPoints);
        layer.batchDraw();
      });
    });

    stage.on("mouseup touchend", () => {
      if (!isErasing) return;

      layer.draw();
      stage.off("mousemove touchmove");
    });

    return () => {
      stage.off("mousedown touchstart");
      stage.off("mousemove touchmove");
      stage.off("mouseup touchend");
      stage.container().style.cursor = "default";
    };
  }, [isErasing, stageRef]);

  return null;
};

export default EraserKonva;
