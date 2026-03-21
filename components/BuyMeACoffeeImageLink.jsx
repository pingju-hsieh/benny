/**
 * Buy Me a Coffee 官方黃色圖片按鈕（僅圖片連結，與全站右下角 widget 並存）。
 */
export default function BuyMeACoffeeImageLink({ className = '' }) {
  return (
    <a
      href="https://www.buymeacoffee.com/banni.walks"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-50/90 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- 官方 CDN 靜態素材 */}
      <img
        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
        alt="Buy Me A Coffee"
        width={217}
        height={60}
        className="h-[60px] w-[217px] max-w-full object-contain"
        loading="lazy"
      />
    </a>
  );
}
