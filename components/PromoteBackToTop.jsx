'use client';

import { ArrowUp } from 'lucide-react';

/** 捲動清單回到頂部（不捲動整頁） */
export default function PromoteBackToTop({ scrollRoot }) {
  return (
    <button
      type="button"
      onClick={() => {
        const root =
          scrollRoot ||
          (typeof document !== 'undefined'
            ? document.querySelector('div[aria-label="推薦清單"]')
            : null);

        if (root && typeof root.scrollTo === 'function') {
          root.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="fixed bottom-28 left-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-amber-200 bg-white/95 text-amber-800 shadow-md ring-1 ring-amber-100 transition hover:bg-amber-50 pointer-events-auto sm:bottom-32"
      aria-label="清單回到頂部"
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}
