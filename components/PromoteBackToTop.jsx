'use client';

import { ArrowUp } from 'lucide-react';

/** 清單變長時固定於左下角，避免與右下角 Buy me a coffee 官方浮動鈕重疊 */
export default function PromoteBackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-28 left-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-amber-200 bg-white/95 text-amber-800 shadow-md ring-1 ring-amber-100 transition hover:bg-amber-50 sm:bottom-32"
      aria-label="回到頁首"
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}
