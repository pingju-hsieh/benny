import Link from 'next/link';
import { Instagram, Sparkles, MapPin, Lamp } from 'lucide-react';
import BuyMeACoffeeImageLink from './BuyMeACoffeeImageLink';

/** 三頁共用：左欄主按鈕（略淡琥珀）；無襯線、字級略大、字重加粗 */
const leftCtaClassName =
  'group relative flex min-h-[60px] w-full min-w-0 items-center justify-center gap-2.5 overflow-hidden rounded-lg border border-amber-500/25 bg-amber-400 px-4 py-2.5 font-sans text-base font-semibold leading-snug text-white shadow-sm transition hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-50/90 active:scale-[0.99] sm:min-h-[64px] sm:text-lg';

const ctaRowClassName = 'flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4';
const ctaLeftColClassName = 'flex min-w-0 flex-1 flex-col';
const ctaRightColClassName = 'flex shrink-0 justify-center sm:justify-end sm:items-center';

function getConfig(collection) {
  switch (collection) {
    case 'Travel':
      return {
        title: '遊記攝影',
        text:
          '若這些路線與畫面對你的旅程有幫助，歡迎到「漫步推薦」看我整理過的旅宿與行程工具；透過站內連結完成預訂，價格不另加，也能支持我下一趟的旅費與寫作。',
        supportNote:
          '「漫步推薦」裡會持續更新旅宿與好物清單。每一杯咖啡與合作導購，都是我繼續記錄風景與故事的小小旅費基金。',
        ctaLayout: 'default',
      };
    case 'Discussion':
      return {
        title: '經濟討論',
        text: '跨越學術與實務的邊界。如果您對 Empirical IO、數據分析或頂尖歐陸碩士申請有進一步的諮詢需求，歡迎與我聯繫。',
        supportNote:
          '你的閱讀與支持，是我持續投入 Empirical IO 研究、撰寫更深入經濟分析文章的重要動力。',
        ctaLayout: 'default',
      };
    case 'Salon':
    case 'Sentiment':
    default:
      return {
        title: '文字日常',
        supportNote:
          '你的追蹤與贊助、漫步推薦的導購，會成為我在異地持續寫詩、寫散文、完成第一本詩集的溫柔推力與出版準備。',
        ctaLayout: 'salon',
      };
  }
}

function getLeftCta(collection, cfg) {
  if (cfg.ctaLayout === 'salon') {
    return {
      href: '/promote#read',
      label: '漫步推薦',
      Icon: Sparkles,
    };
  }
  if (collection === 'Travel') {
    return {
      href: '/promote#travel',
      label: '漫步推薦 · 旅宿與行程',
      Icon: MapPin,
    };
  }
  return {
    href: '/collaboration',
    label: '探索合作諮詢',
    Icon: Lamp,
  };
}

const IG_URL = 'https://www.instagram.com/banni_walks';

export default function PostFooterCTA({ collection }) {
  const cfg = getConfig(collection);
  const leftCta = getLeftCta(collection, cfg);
  const Icon = leftCta.Icon;

  return (
    <section className="mt-12 rounded-2xl border border-amber-100 bg-amber-50/60 px-6 py-6 sm:px-8 sm:py-7">
      <div className="space-y-4">
        {cfg.ctaLayout === 'salon' ? (
          <p className="text-sm font-serif leading-relaxed text-gray-700 sm:text-base">
            如果你也在這些文字中找到了共鳴的碎片，歡迎追蹤我的日常漫步{' '}
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-amber-800 underline decoration-amber-300/90 underline-offset-[3px] transition hover:text-amber-950"
            >
              <Instagram className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              @banni_walks
            </a>
            ，或給予我一點微小的支持；能為我累積詩集出版的資金。
          </p>
        ) : (
          <p className="text-sm font-serif leading-relaxed text-gray-700 sm:text-base">{cfg.text}</p>
        )}

        <div className="h-px bg-amber-100/70" />

        <div className="space-y-3">
          <div className={ctaRowClassName}>
            <div className={ctaLeftColClassName}>
              <Link href={leftCta.href} className={leftCtaClassName}>
                <Icon className="h-5 w-5 shrink-0 text-white sm:h-6 sm:w-6" strokeWidth={2} aria-hidden />
                <span className="relative">{leftCta.label}</span>
              </Link>
            </div>
            <div className={ctaRightColClassName}>
              <BuyMeACoffeeImageLink />
            </div>
          </div>

          <p className="text-right text-[11px] leading-snug text-gray-500 sm:text-center">
            {cfg.supportNote}
          </p>
        </div>
      </div>
    </section>
  );
}
