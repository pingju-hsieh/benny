'use client';

import AffiliateLink from './AffiliateLink';

export default function AdBanner() {
  return (
    <div className="w-full mt-6 rounded-2xl border border-amber-100 bg-amber-50/60 px-4 py-3 text-sm text-amber-900 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-serif font-semibold tracking-wide">旅人小小補給站</p>
          <p className="text-xs mt-1">
            這裡可以放 Booking.com 或其他導購連結，幫助你在旅行時找到落腳的地方。
          </p>
        </div>
        <AffiliateLink
          href="https://www.booking.com/"
          className="shrink-0 inline-flex items-center rounded-full bg-amber-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-700 transition"
        >
          查看優惠
        </AffiliateLink>
      </div>
    </div>
  );
}

