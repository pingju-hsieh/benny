'use client';

import { useCallback, useState } from 'react';
import PromoteBackToTop from './PromoteBackToTop';
import PromoteHashScroll from './PromoteHashScroll';
import PromoteTocNav from './PromoteTocNav';

/**
 * 漫步推薦：標題、說明、目錄固定；僅右側清單區塊可捲動。
 */
export default function PromoteScrollLayout({ tocEntries, children }) {
  const [scrollRoot, setScrollRoot] = useState(null);

  const setScrollContainer = useCallback((node) => {
    setScrollRoot(node ?? null);
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-gray-50 px-4 py-6 text-[#333333] sm:px-6 sm:py-8">
      <PromoteHashScroll scrollRoot={scrollRoot} />

      <div className="mx-auto flex w-full max-w-6xl min-h-0 flex-1 flex-col overflow-hidden">
        {/* 固定：標題 + 說明 */}
        <header className="mx-auto mb-4 max-w-3xl shrink-0 text-center lg:mb-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-amber-700/90">
            Affiliate & picks
          </p>
          <h1 className="font-serif text-3xl font-bold tracking-wide text-amber-950 sm:text-4xl">
            漫步推薦
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-600 sm:mt-4">
            這裡是我整理過的旅宿、讀物與常用服務。標示為合作連結的項目，若你點擊並完成消費，我會收到平台給創作者的回饋——
            <strong className="font-medium text-gray-700">你支付的價格不會因此變貴</strong>
            ，但能支持我繼續寫作、拍照與維護網站。
          </p>
        </header>

        {/* 下方：目錄（固定）+ 僅清單捲動 */}
        <div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row lg:gap-10 xl:gap-14">
          <PromoteTocNav entries={tocEntries} scrollRoot={scrollRoot} />

          <div
            ref={setScrollContainer}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 [-webkit-overflow-scrolling:touch]"
            tabIndex={0}
            aria-label="推薦清單"
          >
            {children}
          </div>
        </div>
      </div>

      <PromoteBackToTop scrollRoot={scrollRoot} />
    </div>
  );
}
