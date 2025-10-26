import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ArrowDown } from 'lucide-react';
import ParticlesCanvas from './ParticlesCanvas'; // ⬅️ 引入你剛剛寫好的組件

const PEN_NAME = '斑泥漫步';

const HomePage = React.memo(({ canvasRef, scrollY }) => {
  const canvasParallaxStyle = useMemo(() => ({
    transform: `translateY(${scrollY * 0.4}px)`,
    opacity: 1 - scrollY / 500,
  }), [scrollY]);

  const infoParallaxStyle = useMemo(() => ({
    transform: `translateY(${scrollY * 0.2}px)`,
  }), [scrollY]);

  const lightEffectStyle = {
    background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, rgba(250, 250, 250, 0.7) 50%, rgba(250, 250, 250, 0.0) 100%)',
  };

  return (
    <>
      <div className="relative w-full h-[100vh] flex items-center justify-center text-center overflow-hidden bg-off-white">
        {/* Canvas 粒子背景 */}
        <div
          className="absolute inset-0 w-full h-full z-0 transition-transform duration-100 ease-out"
          style={{ ...lightEffectStyle, ...canvasParallaxStyle }}
        >
          <ParticlesCanvas canvasRef={canvasRef} />
        </div>

        {/* 中間文字資訊區塊 */}
        <div
          className="relative z-10 p-8 md:p-12 max-w-4xl text-[#333333] transition-transform duration-100 ease-out"
          style={infoParallaxStyle}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-extrabold mb-6 tracking-widest leading-tight pointer-events-none select-none h-[150px] md:h-[200px] text-[#333333] opacity-0">
            {PEN_NAME}
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 tracking-wider leading-relaxed border-t border-b border-gray-300 py-4 inline-block mt-4">
            觀 | 文學與光影
          </p>
          <p className="mt-8 text-lg text-gray-500">
            —— 點擊或向下捲動探索我的世界 ——
          </p>
          <div className="mt-12">
            <ArrowDown className="w-8 h-8 mx-auto text-gray-500 animate-bounce" />
          </div>
        </div>
      </div>

      {/* 第二區塊：內文展示 */}
      <div className="w-full bg-off-white min-h-[100vh]">
        <div className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-[#333333] mb-8 pb-3 text-center">
            最新消息 📜
          </h2>
          <div className="text-center text-gray-600">
            <p>這是一個向下捲動的內容區塊，展示了主視覺與內容區塊的懸浮效果。</p>
            <p className='mt-4'>您可以繼續新增關於「最新文章」與「自我介紹」的內容。</p>
          </div>
        </div>
        <div className="h-[50vh]"></div> {/* 增加捲動空間 */}
      </div>
    </>
  );
});

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef(null);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-off-white text-[#333333] font-sans antialiased">
      {/* 導覽列 */}
      <header className="sticky top-0 z-50 transition-all duration-300 bg-white shadow-md text-[#333333]">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-serif font-bold tracking-widest cursor-pointer">
            {PEN_NAME}
          </div>
          <button className="flex items-center border border-current px-3 py-1 text-sm rounded-full hover:bg-current hover:text-white transition-colors duration-300 border-[#333333] text-[#333333]">
            聯繫我
          </button>
        </nav>
      </header>

      {/* 主要內容 */}
      <main className="min-h-[200vh]">
        <HomePage canvasRef={canvasRef} scrollY={scrollY} />
      </main>

      {/* 頁尾 */}
      <footer className="w-full py-8 border-t border-gray-200 mt-auto bg-white">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} {PEN_NAME} | 個人作品集與文學雜誌 | 設計靈感源自中國簡約風
          </p>
          <p className="mt-2">“吾心安處，便是吾鄉。”</p>
        </div>
      </footer>
    </div>
  );
};

export default App;