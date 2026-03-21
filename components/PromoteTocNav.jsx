'use client';

import { useEffect, useState } from 'react';

/**
 * 漫步推薦：分類目錄（桌面側欄 + 手機橫向捲動）。
 * 用 IntersectionObserver 標示目前閱讀區塊，清單變長時仍好定位。
 */
export default function PromoteTocNav({ entries }) {
  const [activeId, setActiveId] = useState(entries[0]?.id ?? '');

  useEffect(() => {
    const ids = entries.map((e) => e.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (els.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (list) => {
        const visible = list
          .filter((e) => e.isIntersecting && e.target.id)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [entries]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      try {
        history.replaceState(null, '', `#${id}`);
      } catch {
        /* ignore */
      }
    }
  };

  const linkClass = (id) =>
    `shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition sm:text-sm ${
      activeId === id
        ? 'bg-amber-700 text-white shadow-sm'
        : 'bg-white/90 text-amber-900 ring-1 ring-amber-200/80 hover:bg-amber-50'
    }`;

  const asideLinkClass = (id) =>
    `block w-full rounded-xl px-3 py-2 text-left text-sm transition ${
      activeId === id
        ? 'bg-amber-100 font-semibold text-amber-950 ring-1 ring-amber-200/80'
        : 'text-gray-700 hover:bg-amber-50/80'
    }`;

  return (
    <div className="min-w-0 lg:max-w-[240px]">
      {/* 手機：黏在頂部導覽列下方，橫向捲動 */}
      <nav
        aria-label="漫步推薦分類"
        className="sticky top-16 z-30 -mx-4 mb-8 border-b border-amber-100/90 bg-gradient-to-b from-amber-50/95 to-amber-50/40 px-4 py-2.5 backdrop-blur-md lg:hidden"
      >
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-amber-800/70">
          快速跳轉
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {entries.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => scrollTo(e.id)}
              className={linkClass(e.id)}
            >
              {e.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 桌面：左側固定目錄 */}
      <nav
        aria-label="漫步推薦分類"
        className="sticky top-24 z-10 hidden w-full rounded-2xl border border-amber-100/90 bg-white/90 p-3 shadow-sm ring-1 ring-amber-50/80 lg:block"
      >
        <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-amber-800/70">
          目錄
        </p>
        <ul className="space-y-0.5">
          {entries.map((e) => (
            <li key={e.id}>
              <button type="button" onClick={() => scrollTo(e.id)} className={asideLinkClass(e.id)}>
                {e.label}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-3 border-t border-amber-100/80 px-1 pt-3 text-[11px] leading-snug text-gray-500">
          清單變多時，用這裡跳到各分類；每個分類內可並列多張卡片。
        </p>
      </nav>
    </div>
  );
}
