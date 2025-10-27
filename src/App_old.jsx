import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ArrowDown, BookOpen, Camera, Home, Clock, Lamp} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ParticlesCanvas from './ParticlesCanvas'; // ⬅️ 引入你剛剛寫好的組件
import PhotographyCarousel from './PhotoSlider';

const PEN_NAME = '斑泥走走';
const BG_COLOR = 'bg-gray-50'; // 統一使用一個淺灰色背景


// --- 專屬分頁元件 ---

const LiterarySalonPage = () => (
  // 修正 template literal 語法
  <div className={`min-h-screen ${BG_COLOR} py-24 px-4 sm:px-6 lg:px-8`}>
    <div className="max-w-4xl mx-auto">
      <h2 className="text-5xl font-serif text-[#333333] text-center mb-12 border-b pb-4 tracking-wider">
        <BookOpen className="inline-block w-8 h-8 mr-3 text-amber-600" />
        文學沙龍
      </h2>
      <div className="space-y-12">
        <div className="p-6 rounded-xl bg-white shadow-lg transition duration-300 hover:shadow-xl hover:scale-[1.02]">
          <h3 className="text-3xl font-serif text-gray-800 mb-3 border-l-4 border-amber-500 pl-3">
            【新詩】午後的靜默
          </h3>
          <p className="text-sm text-gray-500 mb-4 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            發表於 2025/10/26
          </p>
          <p className="text-gray-700 leading-relaxed indent-8">
            陽光穿過百葉窗，在木地板上切割出黃金的幾何。時間像一隻懶散的貓，蜷縮在書頁的邊緣，不願挪動。我在這片靜默裡，撿拾破碎的靈感，將其縫合成詩。沙龍的午後，只剩下筆尖與紙張的輕微摩擦聲，那便是世界最溫柔的絮語。
          </p>
          <a href="#" className="mt-4 inline-block text-amber-600 hover:text-amber-800 transition duration-300 font-medium">
            閱讀全文...
          </a>
        </div>
        <div className="p-6 rounded-xl bg-white shadow-lg transition duration-300 hover:shadow-xl hover:scale-[1.02]">
          <h3 className="text-3xl font-serif text-gray-800 mb-3 border-l-4 border-amber-500 pl-3">
            【散文】城市裡的孤島咖啡館
          </h3>
          <p className="text-sm text-gray-500 mb-4 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            發表於 2025/10/20
          </p>
          <p className="text-gray-700 leading-relaxed indent-8">
            每個城市都有一個能讓你暫時逃離喧囂的角落，我的孤島，是一間永遠播放著爵士樂的老咖啡館。在這裡，文字的浪潮不會淹沒你，只會輕輕拍打著心靈的海岸線。一杯黑咖啡，足夠抵擋世間所有的紛擾。
          </p>
          <a href="#" className="mt-4 inline-block text-amber-600 hover:text-amber-800 transition duration-300 font-medium">
            閱讀全文...
          </a>
        </div>
      </div>
    </div>
  </div>
);

const TravelPhotographyPage = () => (
  // 修正 template literal 語法
  <div className={`min-h-screen ${BG_COLOR} py-24 px-4 sm:px-6 lg:px-8`}>
    <div className="max-w-6xl mx-auto">
      <h2 className="text-5xl font-serif text-[#333333] text-center mb-12 border-b pb-4 tracking-wider">
        <Camera className="inline-block w-8 h-8 mr-3 text-blue-600" />
        旅遊攝影
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {['冰島峽灣', '京都禪意', '撒哈拉星空', '台東日出', '威尼斯水影'].map((title, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.03] transition duration-300 bg-white">
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-medium">
              
            </div>
            <div className="p-4">
              <h3 className="text-2xl font-serif text-gray-800">{title}</h3>
              <p className="text-sm text-gray-500 mt-2">
                記錄下那片刻的寧靜與永恆。
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const EconomicDiscussionPage = () => (
  // 修正 template literal 語法
  <div className={`min-h-screen ${BG_COLOR} py-24 px-4 sm:px-6 lg:px-8`}>
    <div className="max-w-4xl mx-auto">
      <h2 className="text-5xl font-serif text-[#333333] text-center mb-12 border-b pb-4 tracking-wider">
        <Lamp className="inline-block w-8 h-8 mr-3 text-green-600" />
        經濟討論
      </h2>
      <div className="space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <p className="text-xl font-serif text-gray-800 border-b pb-4">
          巨觀視角下的市場脈動與個人財富思辨。
        </p>
        <p className="text-gray-700 leading-relaxed">
          本區塊專注於對全球經濟趨勢、金融市場結構變革以及投資哲學的深入討論。我們不提供投資建議，只提供理性分析與跨領域思維的碰撞。
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 pl-4">
          <li>宏觀經濟學的邊界與挑戰</li>
          <li>技術進步對勞動力市場的長期影響</li>
          <li>亞洲新興市場的投資潛力分析</li>
        </ul>
      </div>
    </div>
  </div>
);

// --- 主頁區塊元件 ---

const LatestWorksSection = React.memo(({ navigateTo }) => {
  const featuredWorks = [
    { 
      title: '時間的灰燼：論現代主義的消亡', 
      category: '文學沙龍', 
      subCategory: '新詩', 
      date: '2025-10-25',
      preview: '在現代主義的廢墟中，我們尋找新的光芒。這是一場關於時間與記憶的詩意探索...',
      view: 'salon',
      colorClass: 'text-amber-700 border-amber-700 bg-amber-100',
      hoverBorderClass: 'hover:border-amber-500'
    },
    { 
      title: '追逐極光：冰島的零度旅行筆記', 
      category: '旅遊攝影', 
      subCategory: '冰島', 
      date: '2025-10-22',
      preview: '冰島的夜晚，極光如夢幻般舞動，每一幀都是大自然最動人的傑作...',
      view: 'photography',
      colorClass: 'text-blue-700 border-blue-700 bg-blue-100',
      hoverBorderClass: 'hover:border-blue-500'
    },
    { 
      title: '通脹螺旋與軟著陸：央行博弈論', 
      category: '經濟討論', 
      subCategory: '宏觀', 
      date: '2025-10-18',
      preview: '深入解析全球央行在通脹與衰退之間的微妙平衡，以及其政策對市場的潛在影響。',
      view: 'economic',
      colorClass: 'text-green-700 border-green-700 bg-green-100',
      hoverBorderClass: 'hover:border-green-500'
    },
  ];

  return (
    <div className="py-16 border-t border-gray-200">
      {/* 標題置中 */}
      <div className="text-center">
        <h3 className="text-4xl font-serif text-center text-[#333333] mb-12 border-b-2 border-amber-500 pb-3 inline-block mx-auto">
          最新作品
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {featuredWorks.map((work, index) => (
          <div 
            key={index} 
            className={`p-6 bg-white rounded-lg shadow-xl transition duration-300 hover:shadow-2xl hover:-translate-y-2 transform border-t-4 border-b-4 border-transparent ${work.hoverBorderClass}`}
          >
            <div className="flex items-center space-x-2 mb-2">
              {/* 修正 template literal 語法 */}
              <span className={`inline-block text-xs font-semibold py-1 px-3 rounded-full uppercase ${work.colorClass}`}>
                {work.category}
              </span>
              {work.subCategory && (
                <span className="inline-block text-xs font-medium py-1 px-3 rounded-full bg-gray-100 text-gray-600">
                  {work.subCategory}
                </span>
              )}
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mt-3 hover:text-gray-900 cursor-pointer transition">
              {work.title}
            </h4>
            <p className="text-sm text-gray-500 mt-2">
              <Clock className="w-3 h-3 inline mr-1" />
              {work.date}
            </p>
            {work.preview && (
              <p className="text-gray-600 text-base mt-3 leading-relaxed line-clamp-3">
                {work.preview}
              </p>
            )}
            <div className="text-center mt-6">
              {/* 修正 template literal 語法 */}
              <button 
                onClick={() => navigateTo(work.view)}
                className={`text-sm font-medium ${work.colorClass.split(' ').filter(c => !c.startsWith('bg-')).join(' ')} border px-4 py-1 rounded-full hover:opacity-80 transition duration-300`}
              >
                查看「{work.category}」
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// 自我介紹區
// 自我介紹區
const AboutSection = React.memo(({ navigateTo }) => (
  <div className="py-16 border-t border-gray-200 mt-16">
    {/* 標題置中 */}
    <div className="text-center">
      <h3 className="text-4xl font-serif text-center text-[#333333] mb-12 border-b-2 border-amber-500 pb-3 inline-block mx-auto">
        介紹
      </h3>
    </div>

    {/* ✅ 整塊 hover + click 卡片區塊 */}
    <div
      onClick={() => navigateTo('about')}
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
));

// 首頁內容元件
const HomePage = React.memo(({ canvasRef, scrollY, navigateTo }) => {
  const featuredRef = useRef(null);
  const contentRef = useRef(null);

  // 第一個箭頭往下（到攝影圖片）
  const scrollToFeatured = useCallback(() => {
    if (featuredRef.current) {
      window.scrollTo({
        top: featuredRef.current.offsetTop,
        behavior: 'smooth'
      });
    }
  }, []);

  // 第二個箭頭往下（到文章區塊）
  const scrollToContent = useCallback(() => {
    if (contentRef.current) {
      window.scrollTo({
        top: contentRef.current.offsetTop,
        behavior: 'smooth'
      });
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
      {/* 區塊一：主視覺與粒子背景 */}
      <div className={`relative w-full h-[100vh] flex items-center justify-center text-center overflow-hidden ${BG_COLOR}`}>
        {/* Canvas 粒子背景 - 視差滾動 */}
        <div
          className="absolute inset-0 w-full h-full z-0 transition-transform duration-100 ease-out"
          style={{ ...lightEffectStyle, ...canvasParallaxStyle }}
        >
          <ParticlesCanvas canvasRef={canvasRef} />
        </div>

        {/* 中間文字資訊區塊 - 視差滾動 */}
        <div
          className="relative z-10 p-8 md:p-12 max-w-4xl text-[#333333] transition-transform duration-100 ease-out"
          style={infoParallaxStyle}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-extrabold mb-6 tracking-widest leading-tight pointer-events-none select-none h-[150px] md:h-[200px] text-[#333333] opacity-0">
          {PEN_NAME}
          </h1>

          <p
            className="text-xl md:text-2xl text-gray-600 tracking-wider leading-relaxed border-t border-b border-gray-300 py-4 inline-block mt-4 cursor-pointer hover:text-amber-700 transition duration-300"
            onClick={scrollToFeatured} // ✅ 第一個箭頭滾到圖片頁
          >
            觀看 | 文學與光影
          </p>
          <p className="mt-8 text-lg text-gray-500">
            —— 向下探索我的世界 ——
          </p>
          <div className="mt-12">
            <ArrowDown
              className="w-8 h-8 mx-auto text-gray-500 animate-bounce cursor-pointer hover:text-amber-700 transition duration-300"
              onClick={scrollToFeatured} // ✅ 第一個箭頭滾到圖片頁
            />
          </div>
        </div>
      </div>

      {/* 區塊二：特色圖片、最新作品與自我介紹 */}
      <div className={`w-full ${BG_COLOR} min-h-[100vh]`}>
        {/* 🎯 攝影圖片頁，這裡設 ref，讓首頁箭頭滾到這裡 */}
        <div ref={featuredRef}>
          <PhotographyCarousel scrollY={scrollY} onScrollNext={scrollToContent} />
        </div>

        {/* 📜 最新文章區塊（白色箭頭的目標） */}
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

// 主應用程式元件
const App = () => {
  const [scrollY, setScrollY] = useState(0);
  // 預設從 'home' 開始
  const [currentView, setCurrentView] = useState('home'); 
  const canvasRef = useRef(null);
  const isHomePage = currentView === 'home';

  const handleScroll = useCallback(() => {
    // 只在主頁模式下追蹤滾動，以維持視差效果
    if (isHomePage) {
      setScrollY(window.scrollY);
    }
  }, [isHomePage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navigateTo = (view) => {
    setCurrentView(view);
    // 切換頁面時，將滾動位置重置
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
    setScrollY(0);
  };

  // 根據 currentView 渲染不同的內容
  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomePage canvasRef={canvasRef} scrollY={scrollY} navigateTo={navigateTo} />;
      case 'salon':
        return <LiterarySalonPage />;
      case 'photography':
        return <TravelPhotographyPage />;
      case 'economic':
        return <EconomicDiscussionPage />;
      default:
        return <HomePage canvasRef={canvasRef} scrollY={scrollY} navigateTo={navigateTo} />;
    }
  };

  // 導覽列項目配置
  const navItems = [
    { name: '主頁', view: 'home', icon: Home },
    { name: '文學沙龍', view: 'salon', icon: BookOpen },
    { name: '旅遊攝影', view: 'photography', icon: Camera },
    { name: '經濟討論', view: 'economic', icon: Lamp },
  ];

  return (
    // 修正 template literal 語法
    <div className={`min-h-screen text-[#333333] font-sans antialiased ${BG_COLOR}`}>
      {/* 導覽列 (Navbar) */}
      <header className="sticky top-0 z-50 transition-all duration-300 bg-white shadow-md text-[#333333]">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div 
            className="text-3xl font-serif font-bold tracking-widest cursor-pointer mb-2 sm:mb-0 text-amber-700"
            onClick={() => navigateTo('home')}
          >
            {PEN_NAME}
          </div>
          <div className="flex space-x-1 sm:space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => navigateTo(item.view)}
                  // 修正 template literal 語法
                  className={`flex items-center text-sm md:text-base font-medium px-3 py-1 rounded-full transition-colors duration-300 ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-1 hidden sm:inline-block" />
                  {item.name}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* 主要內容區域：根據 currentView 渲染 */}
      <main className="min-h-[100vh]">
        {renderContent()}
      </main>

      {/* 頁尾 */}
      <footer className="w-full py-8 border-t border-gray-200 mt-auto bg-white">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500 px-4">
          <p>
            © {new Date().getFullYear()} {PEN_NAME} | 個人創作 | 版權所有
          </p>
          <p className="mt-2">“你若愛上世界的美，那美就是神的呼喚 - Thomas Merton”</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
