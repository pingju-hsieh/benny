// src/App.jsx (✨全新改版：React Router + 多頁式架構)
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// 📦 各個頁面元件
import HomePage from './pages/HomePage';
import LiterarySalonPage from './pages/LiterarySalonPage';
import TravelPhotographyPage from './pages/TravelPhotographyPage';
import EconomicDiscussionPage from './pages/EconomicDiscussionPage';
import AboutPage from './pages/AboutPage';
import BlogIndex from './pages/BlogIndex';
import PostDetailPage from './pages/PostDetailPage';

import { BookOpen, Camera, Lamp, Home } from 'lucide-react';

const PEN_NAME = '斑泥走走';
const BG_COLOR = 'bg-gray-50';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const navItems = [
    { name: '主頁', path: '/', icon: Home },
    { name: '文學沙龍', path: '/salon', icon: BookOpen },
    { name: '旅遊攝影', path: '/photography', icon: Camera },
    { name: '經濟討論', path: '/economic', icon: Lamp },
  ];

  return (
    <div className={`min-h-screen text-[#333333] font-sans antialiased ${BG_COLOR}`}>
      {/* 導覽列 */}

      <header className="sticky top-0 z-50 transition-all duration-300 bg-white shadow-md text-[#333333]">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div
            className="flex items-center space-x-3 cursor-pointer mb-2 sm:mb-0"
            onClick={() => navigate('/')}
          >
            <img
              src="/site_logo.svg"
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl sm:text-3xl font-serif font-bold tracking-widest text-amber-700">
              {PEN_NAME}
            </span>
          </div>
          <div className="flex space-x-1 sm:space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
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

      {/* 📦 主頁內容區域 */}
      <main className="min-h-[100vh]">
        {children}
        {/* 🔁 回首頁按鈕 */}
        <button
          onClick={() => navigate('/')}
          className="fixed bottom-6 right-6 bg-amber-500 text-white px-4 py-2 z-20 rounded-full shadow-lg hover:bg-amber-600 transition flex items-center"
        >
          回主頁
        </button>
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

// App 元件
const App = () => {
  const canvasRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage canvasRef={canvasRef} scrollY={scrollY} />} />
          <Route path="/salon" element={<LiterarySalonPage />} />
          <Route path="/photography" element={<TravelPhotographyPage />} />
          <Route path="/economic" element={<EconomicDiscussionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/posts/:slug" element={<PostDetailPage />} />
        </Routes>
      </AppLayout>
  );
};

export default App;