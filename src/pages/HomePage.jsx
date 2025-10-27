import React, { useRef, useCallback, useMemo } from 'react';
import { ArrowDown } from 'lucide-react';
import ParticlesCanvas from '../components/ParticlesCanvas';
import PhotographyCarousel from '../components/PhotoSlider';
import LatestWorksSection from '../components/LatestWorksSection';
import AboutSection from '../components/AboutSection';

const PEN_NAME = '斑泥走走';
const BG_COLOR = 'bg-gray-50';

const HomePage = React.memo(({ canvasRef, scrollY, navigateTo }) => {
  const featuredRef = useRef(null);
  const contentRef = useRef(null);

  const scrollToFeatured = useCallback(() => {
    if (featuredRef.current) {
      window.scrollTo({ top: featuredRef.current.offsetTop, behavior: 'smooth' });
    }
  }, []);

  const scrollToContent = useCallback(() => {
    if (contentRef.current) {
      window.scrollTo({ top: contentRef.current.offsetTop, behavior: 'smooth' });
    }
  }, []);

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
      <div className={`relative w-full h-[100vh] flex items-center justify-center text-center overflow-hidden ${BG_COLOR}`}>
        <div
          className="absolute inset-0 w-full h-full z-0 transition-transform duration-100 ease-out"
          style={{ ...lightEffectStyle, ...canvasParallaxStyle }}
        >
          <ParticlesCanvas canvasRef={canvasRef} />
        </div>

        <div
          className="relative z-10 p-8 md:p-12 max-w-4xl text-[#333333] transition-transform duration-100 ease-out"
          style={infoParallaxStyle}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-extrabold mb-6 tracking-widest leading-tight pointer-events-none select-none h-[150px] md:h-[200px] text-[#333333] opacity-0">
            {PEN_NAME}
          </h1>

          <p
            className="text-xl md:text-2xl text-gray-600 tracking-wider leading-relaxed border-t border-b border-gray-300 py-4 inline-block mt-4 cursor-pointer hover:text-amber-700 transition duration-300"
            onClick={scrollToFeatured}
          >
            觀看 | 文學與光影
          </p>
          <p className="mt-8 text-lg text-gray-500">—— 向下探索我的世界 ——</p>
          <div className="mt-12">
            <ArrowDown
              className="w-8 h-8 mx-auto text-gray-500 animate-bounce cursor-pointer hover:text-amber-700 transition duration-300"
              onClick={scrollToFeatured}
            />
          </div>
        </div>
      </div>

      <div className={`w-full ${BG_COLOR} min-h-[100vh]`}>
        <div ref={featuredRef}>
          <PhotographyCarousel scrollY={scrollY} onScrollNext={scrollToContent} />
        </div>

        <div
          ref={contentRef}
          className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <LatestWorksSection navigateTo={navigateTo} />
          <AboutSection navigateTo={navigateTo} />
        </div>
      </div>
    </>
  );
});

export default HomePage;