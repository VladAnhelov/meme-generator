import React from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

export default function ColorPaletteComponent({ handleColorChange }) {
  const [color, setColor] = useColor("hex", "#fff");
  const [selectColor, setSelectColor] = React.useState(false);
  const colorPickerRef = React.useRef(null);

  function handleButtonClick() {
    setSelectColor(!selectColor);
  }

  function handleClickOutside(event) {
    if (
      colorPickerRef.current &&
      !colorPickerRef.current.contains(event.target)
    ) {
      setSelectColor(false);
    }
  }

  React.useEffect(() => {
    if (selectColor) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectColor]);

  React.useEffect(() => {
    if (typeof handleColorChange === "function") {
      handleColorChange(color.hex);
    }
  }, [color, handleColorChange]);

  return (
    <div className="color--block">
      <button className="choose--color" onClick={handleButtonClick}>
        text color
      </button>
      <div
        className="selected-color"
        style={{
          backgroundColor: color.hex,
        }}
        onClick={handleButtonClick}
      ></div>
      {selectColor && (
        <div className="color-picker-container" ref={colorPickerRef}>
          <ColorPicker
            width={156}
            height={128}
            color={color}
            onChange={setColor}
            hideRGB
            hideHSV
            hideHEX
            dark
          />
        </div>
      )}
    </div>
  );
}
