import React, { useState, useEffect } from "react";
import { Image as KonvaImage, Layer } from "react-konva";

export default function WaterMark() {
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
  console.log(watermarkImage);
  return (
    <>
      {/* додайте watermark тільки коли воно завантажене */}
      {watermarkLoaded && (
        <Layer>
          <KonvaImage
            image={watermarkImage}
            width={350}
            height={300}
            x={10}
            y={10}
          />
        </Layer>
      )}
    </>
  );
}
