'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Linkedin, Github, ChevronDown, ChevronUp, Mail } from 'lucide-react';

const HERO_TITLE = '合作諮詢';
const HERO_SUBTITLE =
  '畢業於台大經濟系，目前於 TSE（圖盧茲經濟學院）攻讀應用數學與經濟決策碩士，專注於 Industrial Organization（IO）與實證分析研究。現擔任法國教育中心大使';

const SERVICES = [
  {
    id: 'academic',
    title: '歐洲碩士留學諮詢（Academic Consulting）',
    short: '歐陸與英國頂尖經濟碩士申請經驗。',
    badge: 'Academic',
    color: 'rose',
    details: [
      '具備深厚的歐陸留學經驗（荷蘭鹿特丹 Erasmus 交換一年），雅思 7 分。',
      '碩士Admission 包含：LSE EME、TSE MED、Sciences Po（Dual Degree）、Bocconi ESS、LMU MQE、Bonn Econ、EMJ M3EP。',
      '可協助 EME / MED 等頂尖經濟碩士申請策略、SOP / CV 建議與歐陸商管經濟名校選校分享。',
    ],
  },
  {
    id: 'io',
    title: '經濟研究與顧問（IO & Empirical Analysis）',
    short: '實證產業組織與定價策略分析。',
    badge: 'Economics',
    color: 'emerald',
    details: [
      '專注於 Empirical IO、Structural IO 與 Pricing。',
      '目前致力於 Usage-Based Insurance（UBI）、市場失靈與規管設計研究。',
      '考取精算機率證照，具備一年精算顧問公司實習經驗。',
      '具備處理巨量量化資料的能力，歡迎企業與公部門就計量分析與市場機制設計提出合作邀約。',
    ],
  },
  {
    id: 'writing',
    title: '跨領域撰文與專欄（Writing & Commentary）',
    short: '有溫度的撰稿者',
    badge: 'Writing',
    color: 'amber',
    details: [
      '承接經濟政策分析、社會觀察與新聞雜誌邀稿。',
      '具備數段研究助理經驗，曾參與台電計畫並撰寫專業產經能源報告。',
      '擅長將硬核的經濟邏輯與數據，轉化為易於理解且具深度的文字。',
    ],
  },
  {
    id: 'travel',
    title: '旅遊文化與遊記影像（Travel & Photography）',
    short: '走遍 30+ 國家、深耕歐陸小鎮的漫步者。',
    badge: 'Travel',
    color: 'sky',
    details: [
      '記錄超過 30 個國家的自然與人文景緻，特別偏愛歐陸小鎮與慢旅行。',
      '提供深度旅遊心得撰寫、歐洲私房小鎮規劃建議。',
      '可提供影像商業授權與合作專題（展覽、品牌故事影像）。',
    ],
  },
];

const colorClassMap = {
  amber: {
    border: 'border-amber-500',
    badge: 'bg-amber-100 text-amber-800',
    hover: 'hover:border-amber-400',
  },
  emerald: {
    border: 'border-emerald-500',
    badge: 'bg-emerald-100 text-emerald-800',
    hover: 'hover:border-emerald-400',
  },
  sky: {
    border: 'border-sky-500',
    badge: 'bg-sky-100 text-sky-800',
    hover: 'hover:border-sky-400',
  },
  rose: {
    border: 'border-rose-500',
    badge: 'bg-rose-100 text-rose-800',
    hover: 'hover:border-rose-400',
  },
};

export default function ServicePage() {
  const [activeId, setActiveId] = useState(null);
  // 初始根據網址 hash（例如 #academic）決定展開哪一張卡片
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    if (SERVICES.some((s) => s.id === hash)) {
      setActiveId(hash);
    }
  }, []);

  const toggle = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Hero */}
        <section className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-wide md:tracking-widest leading-snug text-[#333333]"
          >
            {HERO_TITLE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6 text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto"
          >
            {HERO_SUBTITLE}
          </motion.p>

          {/* 社群連結列 */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-6 flex items-center justify-center gap-4"
          >
            <a
              href="https://www.instagram.com/banni_walks"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/pj-hsieh/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition"
            >
              <Github className="w-5 h-5" />
            </a>
          </motion.div>
        </section>

        {/* 服務卡片 Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {SERVICES.map((svc, idx) => {
              const isActive = activeId === svc.id;
              const palette = colorClassMap[svc.color];
              return (
                <motion.button
                  key={svc.id}
                  type="button"
                  onClick={() => toggle(svc.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 * idx }}
                  className={`group text-left bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-5 sm:px-6 sm:py-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 ${
                    isActive ? `${palette.border} ring-1 ring-offset-1 ring-${svc.color}-200` : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${palette.badge}`}
                      >
                        {svc.badge}
                      </span>
                      <span className="text-xs text-gray-400">點擊展開</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-serif font-semibold text-[#333333] mb-2 group-hover:text-amber-700 transition-colors">
                      {svc.title}
                    </h2>
                    <p className="text-sm text-gray-600">{svc.short}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <span>{isActive ? '收合說明' : '點擊查看詳細內容'}</span>
                    {isActive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-gray-100 pt-4 mt-2"
                      >
                        <ul className="space-y-2 text-sm text-gray-700">
                          {svc.details.map((line) => (
                            <li key={line} className="leading-relaxed">
                              {line}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10">
          <div className="bg-white rounded-2xl border border-amber-100 shadow-sm px-6 py-8 sm:px-8 sm:py-10">
            <div className="max-w-3xl mx-auto text-center space-y-5">
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#333333]">
                與我聊聊，看看會走到哪裡
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                無論是具體的專案合作、留學疑問，或是單純想聊聊經濟與歐洲生活，都歡迎隨時與我聯繫。
                不一定是純然收費的模式，歡迎認識與交流，或許能碰撞出意想不到的火花。
              </p>
              <div className="pt-2">
                <a
                  href="mailto:br910624@gmail.com?subject=%E5%90%88%E4%BD%9C%E8%88%87%E8%AB%AE%E8%A9%A2%20%7C%20%E6%96%91%E6%B3%A5%E8%B5%B0%E8%B5%B0"
                  className="inline-flex items-center justify-center rounded-full px-6 py-2.5 bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 transition shadow"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  開始我們的對話
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

