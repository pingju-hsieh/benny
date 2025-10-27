import React from 'react';
import { BookOpen, Camera, Lamp } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ 這一行加上！

const AboutSection = React.memo(() => {
  const navigate = useNavigate(); // ✅ 使用 react-router 的 navigate 函數

  return (
    <div className="py-16 border-t border-gray-200 mt-16">
      {/* 標題置中 */}
      <div className="text-center">
        <h3 className="text-4xl font-serif text-center text-[#333333] mb-12 border-b-2 border-amber-500 pb-3 inline-block mx-auto">
          介紹
        </h3>
      </div>

      {/* 整塊 hover + 點擊 */}
      <div
        onClick={() => navigate('/about')} // ✅ 改為 /about 而非 navigateTo('about')
        className="flex flex-col md:flex-row items-center md:space-x-12 bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-100 cursor-pointer transform transition duration-300 hover:scale-[1.02] hover:shadow-xl"
      >
        <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 mb-6 md:mb-0 border-4 border-amber-500 shadow-inner">
          <img
            src="/photo/banni.jpg"
            className="w-full h-full object-cover object-center"
            alt="Featured"
          />
        </div>
        <div className="text-gray-700 space-y-4">
          <p className="text-xl font-serif text-gray-800">斑泥 Bānní</p>
          <p className="leading-relaxed">
            一個熱愛文字與旅遊的靈魂。我的世界由三個維度構成：
            <span className="text-amber-600 font-semibold">文學的沙龍</span>，
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