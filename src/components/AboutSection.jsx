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
          <p className="leading-relaxed">
            一個熱愛文字與旅遊的靈魂。我的世界由三個維度構成：
            <span className="text-amber-600 font-semibold">詩文與日常</span>，
            探討人性的光影與哲學的深度；
            <span className="text-blue-600 font-semibold">旅遊與攝影</span>，
            記錄下地球上每一幀令人屏息的瞬間；
            以及
            <span className="text-green-600 font-semibold">經濟與討論</span>，
            嘗試以理性邏輯解讀世界脈絡。
          </p>
          <p className="leading-relaxed">
            這裡不僅是我的作品集，更是一個開放的空間，邀請你一同漫步在理性和感性的邊界。
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <span className="text-sm text-gray-500 flex items-center">
              <BookOpen className="w-4 h-4 mr-1 text-amber-500" />
              文學：新詩、散文
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