import React from 'react';
import { BookOpen, Camera, Lamp } from 'lucide-react';
import Image from 'next/image';

const AboutSection = React.memo(function AboutSection({ onNavigate }) {
  const go = (path) => {
    if (onNavigate) onNavigate(path);
  };

  return (
    <div className="py-16 border-t border-gray-200 mt-16">

      {/* 整塊 hover + 點擊 */}
      <div
        onClick={() => go('/about')}
        className="flex flex-col md:flex-row items-center md:space-x-12 bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-100 cursor-pointer transform transition duration-300 hover:scale-[1.02] hover:shadow-xl"
      >
        <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 mb-6 md:mb-0 border-4 border-amber-500 shadow-inner">
          <div className="relative w-full h-full">
            <Image
              src="/photo/banni.jpg"
              alt="Featured"
              fill
              sizes="(max-width: 768px) 144px, 176px"
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="text-gray-700 space-y-4">
          <p className="text-xl font-serif text-gray-800">斑泥 Bānní</p>
          <p className="leading-relaxed">在理性的模型裡，尋找感性的餘溫。</p>
          <p className="leading-relaxed">
            我的世界交織於三個座標：
            <span className="text-amber-600 font-semibold">文字與詩</span>，捕捉人性的光影；
            <span className="text-blue-600 font-semibold">攝影與旅遊</span>，凝視世界的靜謐；
            以及
            <span className="text-green-600 font-semibold">經濟分析</span>，拆解市場的機制與賽局。
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <span className="text-sm text-gray-500 flex items-center">
              <BookOpen className="w-4 h-4 mr-1 text-amber-500" />
              文學：新詩、日常
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <Camera className="w-4 h-4 mr-1 text-blue-500" />
              攝影：自然、人文
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <Lamp className="w-4 h-4 mr-1 text-green-500" />
              經濟：決策、政策、市場
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AboutSection;