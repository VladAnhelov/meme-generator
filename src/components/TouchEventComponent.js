import React, { useEffect, useState, useRef } from "react";

const TouchEventComponent = ({ text, x, y }) => {
  const [textX, setTextX] = useState(x);
  const [textY, setTextY] = useState(y);
  const canvasRef = useRef(null);

  const handleMouseDown = (event) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let isDragging = true;
    let currentX = event.clientX;
    let currentY = event.clientY;

    const handleMouseMove = (event) => {
      if (!isDragging) {
        return;
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      setTextX(textX + event.clientX - currentX);
      setTextY(textY + event.clientY - currentY);
      currentX = event.clientX;
      currentY = event.clientY;
      context.fillText(text, textX, textY);
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    context.fillText(text, textX, textY);
  }, [text, textX, textY]);
};

export default TouchEventComponent;
