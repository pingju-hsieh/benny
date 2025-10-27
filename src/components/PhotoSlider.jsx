import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowDown} from "lucide-react";

const imageData = [
  { src: "/photo/feature_photo/img1.jpg", caption: "光影之間，一念生詩。" },
  { src: "/photo/feature_photo/img2.jpg", caption: "無聲之境，靈感自現。" },
  { src: "/photo/feature_photo/img3.jpg", caption: "時間凝結，畫面如詩。" },
  // ... 你可以繼續加更多
];

const PhotoSlider = ({ onScrollNext }) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  // 自動播放
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % imageData.length);
    }, 5000); // 每 5 秒切換
    return () => clearInterval(timerRef.current);
  }, []);

  const handlePrev = () => setIndex((prev) => (prev - 1 + imageData.length) % imageData.length);
  const handleNext = () => setIndex((prev) => (prev + 1) % imageData.length);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-50">
      <img
        src={imageData[index].src}
        alt={`Slide ${index + 1}`}
        className="absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out"
      />

      {/* 詩句 caption */}
      <div className="absolute top-40 left-20 z-20 text-black text-left pointer-events-none">
        <p className="text-2xl font-serif font-extrabold italic drop-shadow-lg">
          {imageData[index].caption}
        </p>
        <p className="text-base mt-2 drop-shadow font-serif font-extrabold">— 斑泥</p>
      </div>

      {/* 遮罩（使上下邊緣模糊） */}
      <div className="absolute top-0 left-0 right-0 h-[25%] bg-gradient-to-b from-gray-50/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-gradient-to-t from-gray-50/90 to-transparent z-10 pointer-events-none" />

      {/* 左右箭頭 */}
      <button onClick={handlePrev} className="absolute left-6 top-1/2 -translate-y-1/2 z-30 text-white hover:opacity-80">
        <ArrowLeft className="w-8 h-8" />
      </button>
      <button onClick={handleNext} className="absolute right-6 top-1/2 -translate-y-1/2 z-30 text-white hover:opacity-80">
        <ArrowRight className="w-8 h-8" />
      </button>

      {/* 向下箭頭 */}
      {onScrollNext && (
        <div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer"
          onClick={onScrollNext}
        >
          <ArrowDown className="w-8 h-8 text-white animate-bounce" />
        </div>
      )}
    </div>
  );
};

export default PhotoSlider;