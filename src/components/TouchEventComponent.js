import React from "react";

const TouchEventComponent = ({
  setTopTextPosition,
  setBottomTextPosition,
  topTextPosition,
  bottomTextPosition,
}) => {
  const useMouseListener = () => {
    React.useEffect(() => {
      const handleMouseDown = (event) => {
        const target = event.target;

        if (target.classList.contains("meme--text")) {
          const textClass = target.classList.contains("top") ? "top" : "bottom";

          function handleMouseMove(event) {
            const IMAGE = document.querySelector(".meme--image");
            const imageRect = IMAGE.getBoundingClientRect();
            const text = document.querySelector(".meme--text.top");
            const textRect = text.getBoundingClientRect();
            const textWidth = textRect.width;
            const textHeight = textRect.height;

            const container = document.querySelector(".meme");
            const containerRect = container.getBoundingClientRect();
            const containerHeight = containerRect.height;

            let x = event.clientX - containerRect.left;
            let y = event.clientY - containerRect.top;

            let textX = x - textWidth / 2;
            let textY = y - textHeight / 2;

            if (textX < imageRect.left) {
              textX = imageRect.left;
            } else if (textX + textWidth > imageRect.right) {
              textX = imageRect.right - textWidth;
            }

            if (textY < 0) {
              textY = 0;
            } else if (textY + textHeight > containerHeight) {
              textY = containerHeight - textHeight;
            }

            if (textClass === "top") {
              setTopTextPosition({
                ...topTextPosition,
                x: `${textX}px`,
                y: `${textY}px`,
              });
            } else {
              setBottomTextPosition({
                ...bottomTextPosition,
                x: `${textX}px`,
                y: `${textY}px`,
              });
            }
          }

          const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
          };

          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        }
      };
      document.addEventListener("mousedown", handleMouseDown);

      return () => {
        document.removeEventListener("mousedown", handleMouseDown);
      };
    }, [topTextPosition, bottomTextPosition]);
  };

  const useTouchListeners = () => {
    React.useEffect(() => {
      const handleTouchStart = (event) => {
        const target = event.target;

        if (target.classList.contains("meme--text")) {
          const textClass = target.classList.contains("top") ? "top" : "bottom";

          function handleTouchMove(event) {
            const IMAGE = document.querySelector(".meme--image");
            const imageRect = IMAGE.getBoundingClientRect();
            const text = document.querySelector(".meme--text.top");
            const textRect = text.getBoundingClientRect();
            const textWidth = textRect.width;
            const textHeight = textRect.height;

            const container = document.querySelector(".meme");
            const containerRect = container.getBoundingClientRect();
            const containerHeight = containerRect.height;

            let x = event.touches[0].clientX - containerRect.left;
            let y = event.touches[0].clientY - containerRect.top;

            let textX = x - textWidth / 2;
            let textY = y - textHeight / 2;

            if (textX < imageRect.left) {
              textX = imageRect.left;
            } else if (textX + textWidth > imageRect.right) {
              textX = imageRect.right - textWidth;
            }

            if (textY < 0) {
              textY = 0;
            } else if (textY + textHeight > containerHeight) {
              textY = containerHeight - textHeight;
            }

            if (textClass === "top") {
              setTopTextPosition({
                ...topTextPosition,
                x: `${textX}px`,
                y: `${textY}px`,
              });
            } else {
              setBottomTextPosition({
                ...bottomTextPosition,
                x: `${textX}px`,
                y: `${textY}px`,
              });
            }
          }

          const handleTouchEnd = () => {
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
          };

          document.addEventListener("touchmove", handleTouchMove);
          document.addEventListener("touchend", handleTouchEnd);
        }
      };

      document.addEventListener("touchstart", handleTouchStart);

      return () => {
        document.removeEventListener("touchstart", handleTouchStart);
      };
    }, [topTextPosition, bottomTextPosition]);

    return null;
  };

  useTouchListeners();
  useMouseListener();

  return null;
};

export default TouchEventComponent;
