import Link from 'next/link';
import AffiliateLink from './AffiliateLink';

function getConfig(collection) {
  switch (collection) {
    case 'Travel':
      return {
        title: '遊記攝影',
        text: '如果這些風景與文字對你的旅程有幫助，歡迎透過以下連結預訂住宿，這將成為我下一趟旅程的底片基金。',
        supportNote:
          '目前在法國圖盧茲求學，每一杯咖啡與住宿導購，都會成為我繼續寫作與拍照的小小底片基金。',
        primaryType: 'external',
        primaryLabel: '前往 Booking.com',
        primaryHref: 'https://www.booking.com/',
      };
    case 'Discussion':
      return {
        title: '經濟討論',
        text: '跨越學術與實務的邊界。如果您對 Empirical IO、數據分析或頂尖歐陸碩士申請有進一步的諮詢需求，歡迎與我聯繫。',
        supportNote:
          '你的閱讀與支持，是我持續投入 Empirical IO 研究、撰寫更深入經濟分析文章的重要動力。',
        primaryType: 'internal',
        primaryLabel: '探索合作諮詢',
        primaryHref: '/collaboration',
      };
    case 'Salon':
    case 'Sentiment':
    default:
      return {
        title: '文學日常',
        text: '如果你也在這些文字中找到了共鳴的碎片，歡迎追蹤我的日常漫步，或給予我一點微小的支持。',
        supportNote:
          '你的追蹤與贊助，會成為我在異地持續寫詩、寫散文、完成第一本詩集的溫柔推力。',
        primaryType: 'external',
        primaryLabel: '追蹤 Instagram',
        primaryHref: 'https://www.instagram.com/banni.walks',
      };
  }
}

export default function PostFooterCTA({ collection }) {
  const cfg = getConfig(collection);

  return (
    <section className="mt-12 rounded-2xl border border-amber-100 bg-amber-50/60 px-6 py-6 sm:px-8 sm:py-7">
      <div className="space-y-4">
        <p className="text-sm sm:text-base text-gray-700 font-serif leading-relaxed">
          {cfg.text}
        </p>

        <div className="h-px bg-amber-100/70" />

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            {/* Primary CTA */}
            {cfg.primaryType === 'internal' ? (
              <Link
                href={cfg.primaryHref}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-amber-700 text-white px-5 py-2.5 text-sm font-medium hover:bg-amber-800 transition"
              >
                {cfg.primaryLabel}
              </Link>
            ) : (
              <AffiliateLink
                href={cfg.primaryHref}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-amber-700 text-white px-5 py-2.5 text-sm font-medium hover:bg-amber-800 transition"
              >
                {cfg.primaryLabel}
              </AffiliateLink>
            )}

            {/* Secondary support button */}
            <a
              href="https://www.buymeacoffee.com/banni"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-full border border-amber-300 text-amber-800 bg-white/70 px-5 py-2.5 text-sm font-medium hover:bg-amber-50 hover:border-amber-400 transition"
            >
              ☕ 贊助一杯咖啡
            </a>
          </div>

          <p className="text-[11px] text-gray-500 leading-snug text-right sm:text-center">
            {cfg.supportNote}
          </p>
        </div>
      </div>
    </section>
  );
}

