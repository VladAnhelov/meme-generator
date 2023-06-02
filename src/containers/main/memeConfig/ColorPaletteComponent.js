import React from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import styles from "./ColorPaletteComponent.module.scss";

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
    <div className={styles.colorBlock}>
      <button className={styles.chooseColor} onClick={handleButtonClick}>
        <p className={styles.textButton}>Text Color</p>
        <div
          className={styles.selectedColor}
          style={{
            backgroundColor: color.hex,
          }}
          onClick={handleButtonClick}
        ></div>
      </button>

      {selectColor && (
        <div className={styles.colorPickerContainer} ref={colorPickerRef}>
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
