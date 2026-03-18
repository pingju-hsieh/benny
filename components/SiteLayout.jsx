'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { BookOpen, Camera, Lamp, Home, User, Heart, Menu, X, Briefcase } from 'lucide-react';
import { useState } from 'react';
import AdBanner from './AdBanner';

const PEN_NAME = '斑泥走走';

const NAV_THEME = {
  '/salon': { active: 'bg-amber-600 text-white shadow-md', hover: 'hover:text-amber-700 hover:bg-amber-50' },
  '/travel': { active: 'bg-blue-600 text-white shadow-md', hover: 'hover:text-blue-700 hover:bg-blue-50' },
  '/discussion': { active: 'bg-green-600 text-white shadow-md', hover: 'hover:text-green-700 hover:bg-green-50' },
  '/blog': { active: 'bg-amber-600 text-white shadow-md', hover: 'hover:text-amber-700 hover:bg-amber-50' },
  '/service': { active: 'bg-amber-700 text-white shadow-md', hover: 'hover:text-amber-700 hover:bg-amber-50' },
  '/about': { active: 'bg-gray-800 text-white shadow-md', hover: 'hover:text-gray-900 hover:bg-gray-100' },
  '/': { active: 'bg-amber-600 text-white shadow-md', hover: 'hover:text-amber-700 hover:bg-amber-50' },
};

const getTheme = (path) => NAV_THEME[path] || NAV_THEME['/'];

export default function SiteLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: '主頁', path: '/', icon: Home },
    { name: '經濟討論', path: '/discussion', icon: Lamp },
    { name: '文字日常', path: '/salon', icon: BookOpen },
    { name: '遊記攝影', path: '/travel', icon: Camera },
    { name: '合作諮詢', path: '/service', icon: Briefcase },
    { name: '所有文章', path: '/blog', icon: BookOpen },
    { name: '關於', path: '/about', icon: User },
  ];

  const go = (path) => {
    router.push(path);
    setOpen(false);
  };

  const isHome = pathname === '/';

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 transition-all duration-300 bg-white shadow-md text-[#333333]">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            type="button"
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => go('/')}
          >
            <Image src="/site_logo.svg" alt="Logo" width={80} height={40} priority />
            {isHome ? (
              <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-widest text-amber-700">
                {PEN_NAME}
              </h1>
            ) : (
              <span className="text-2xl sm:text-3xl font-serif font-bold tracking-widest text-amber-700">
                {PEN_NAME}
              </span>
            )}
          </button>

          {/* 桌面版導覽列 */}
          <div className="hidden md:flex flex-wrap justify-center gap-2 sm:gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              const theme = getTheme(item.path);
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => go(item.path)}
                  className={`flex items-center text-sm md:text-base font-medium px-3 py-1 rounded-full transition-colors duration-300 ${
                    isActive
                      ? theme.active
                      : `text-gray-600 ${theme.hover}`
                  }`}
                >
                  <Icon className="w-4 h-4 mr-1 hidden sm:inline-block" />
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* 手機漢堡選單 */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition"
            aria-label="開啟導覽選單"
            onClick={() => setOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* 手機側邊欄 Drawer */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Image src="/site_logo.svg" alt="Logo" width={32} height={32} />
                <span className="text-xl font-serif font-semibold text-amber-700 tracking-wide">
                  斑泥走走
                </span>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full p-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition"
                aria-label="關閉導覽選單"
                onClick={() => setOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-2">
              {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path;
                  const theme = getTheme(item.path);
                  return (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() => go(item.path)}
                      className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-base font-serif tracking-wide transition ${
                        isActive
                          ? theme.active.replace('shadow-md', 'shadow')
                          : `text-gray-700 ${theme.hover}`
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </span>
                    </button>
                  );
                })}
            </nav>

            <div className="px-5 pb-6 border-t border-gray-100">
              <AdBanner />
            </div>
          </aside>
        </div>
      )}

      <main className="min-h-[100vh]">{children}</main>

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
}

