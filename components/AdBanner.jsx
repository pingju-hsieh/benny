'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

/**
 * 手機側邊選單底部：導向站內「漫步推薦」頁（導購／好物整理）。
 */
export default function AdBanner({ onInternalNavigate }) {
  return (
    <div className="w-full mt-4 rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50/90 to-white px-4 py-3.5 text-sm text-amber-950 shadow-sm ring-1 ring-amber-100/80">
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 shadow-inner"
          aria-hidden
        >
          <Sparkles className="h-4 w-4" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="font-serif font-semibold tracking-wide text-amber-900">漫步推薦</p>
          <p className="text-xs leading-relaxed text-amber-900/85">
            旅宿、讀物與我實際用過的服務；連結為合作導購，你付的價格不變，我會收到微薄回饋，支持網站與創作。
          </p>
        </div>
      </div>
      <Link
        href="/promote"
        className="mt-3 flex w-full items-center justify-center rounded-full bg-amber-700 px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-amber-800"
        onClick={() => onInternalNavigate?.()}
      >
        前往漫步推薦
      </Link>
    </div>
  );
}
