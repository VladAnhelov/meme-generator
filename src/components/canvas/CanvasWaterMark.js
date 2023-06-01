import React, { useState, useEffect } from "react";
import { Image as KonvaImage, Layer } from "react-konva";

export default function CanvasWaterMark() {
  const [watermarkImage, setWatermarkImage] = useState(null);
  const [watermarkLoaded, setWatermarkLoaded] = useState(false);
  //add watermark
  useEffect(() => {
    const watermark = new Image();
    watermark.onload = () => {
      setWatermarkImage(watermark);
      setWatermarkLoaded(true);
    };
    watermark.src = "watermark.png";
  }, []);
  return (
    <>
      {/* додайте watermark тільки коли воно завантажене */}
      {watermarkLoaded && (
        <Layer>
          <KonvaImage
            image={watermarkImage}
            width={90}
            height={20}
            x={5}
            y={5}
          />
        </Layer>
      )}
    </>
  );
}
