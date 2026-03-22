'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { ArrowDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ParticlesCanvas from '../src/components/ParticlesCanvas';
import LatestWorksSection from '../src/components/LatestWorksSection';
import AboutSection from '../src/components/AboutSection';
import ServicePreviewSection from '../src/components/ServicePreviewSection';

const PEN_NAME = '斑泥 Bānní';
const BG_COLOR = 'bg-gray-50';

export default function HomePage() {
  const router = useRouter();
  const canvasRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const contentRef = useRef(null);

  /** 捲動驅動的 transform 不要用 CSS transition，否則與每幀捲動值打架，回到頂部時會瘋狂抖動 */
  useEffect(() => {
    let ticking = false;
    const flush = () => {
      ticking = false;
      const y = window.scrollY;
      setScrollY(y < 0 ? 0 : y);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(flush);
      }
    };
    flush();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToContent = useCallback(() => {
    if (contentRef.current) window.scrollTo({ top: contentRef.current.offsetTop, behavior: 'smooth' });
  }, []);

  const canvasParallaxStyle = useMemo(() => {
    const y = scrollY;
    const opacity = Math.min(1, Math.max(0, 1 - y / 500));
    return { transform: `translate3d(0, ${y * 0.4}px, 0)`, opacity };
  }, [scrollY]);
  const infoParallaxStyle = useMemo(
    () => ({ transform: `translate3d(0, ${scrollY * 0.2}px, 0)` }),
    [scrollY]
  );
  const lightEffectStyle = {
    background:
      'radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, rgba(250, 250, 250, 0.7) 50%, rgba(250, 250, 250, 0.0) 100%)',
  };

  return (
    <>
      <div className={`relative w-full h-[100vh] flex items-center justify-center text-center overflow-hidden ${BG_COLOR}`}>
        <div
          className="absolute inset-0 z-0 h-full w-full will-change-transform"
          style={{ ...lightEffectStyle, ...canvasParallaxStyle }}
        >
          <ParticlesCanvas canvasRef={canvasRef} />
        </div>

        <div
          className="relative z-10 max-w-4xl px-6 py-12 text-center text-[#333333] will-change-transform sm:px-10 sm:py-14 md:p-12"
          style={infoParallaxStyle}
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-serif font-extrabold mb-4 md:mb-6 tracking-wide md:tracking-widest leading-snug md:leading-tight pointer-events-none select-none h-[140px] sm:h-[160px] md:h-[190px] text-[#333333] opacity-0">
            {PEN_NAME}
          </h1>

          {/* <p
            className="text-xl sm:text-2xl md:text-3xl text-gray-600 tracking-wide md:tracking-wider leading-snug md:leading-relaxed mt-4 cursor-pointer hover:text-amber-700 transition duration-300"
            onClick={scrollToContent}
          >
            在理性的模型裡，尋找感性的餘溫
          </p>
          <p className="mt-4 md:mt-6 text-base sm:text-lg text-gray-500 tracking-wide max-w-2xl mx-auto">
            我的世界交織於三個座標：文學與詩，捕捉人性的光影；攝影與旅遊，凝視世界的靜謐；以及經濟分析，拆解市場的機制與賽局。
          </p> */}
          <p className="mt-3 text-sm text-gray-400 tracking-wide">—— 向下探索 ——</p>
          <div className="mt-12">
            <ArrowDown
              className="w-8 h-8 mx-auto text-gray-500 animate-bounce cursor-pointer hover:text-amber-700 transition duration-300"
              onClick={scrollToContent}
            />
          </div>
        </div>
      </div>

      <div className={`w-full ${BG_COLOR} min-h-[100vh]`}>
        <div ref={contentRef} className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <LatestWorksSection onNavigate={(path) => router.push(path)} />
          <ServicePreviewSection />
          <AboutSection onNavigate={(path) => router.push(path)} />
        </div>
      </div>
    </>
  );
}

