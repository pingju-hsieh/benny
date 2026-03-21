import { MapPin, BookOpen, Package } from 'lucide-react';
import AffiliateLink from '../../components/AffiliateLink';
import PromoteBackToTop from '../../components/PromoteBackToTop';
import PromoteHashScroll from '../../components/PromoteHashScroll';
import PromoteTocNav from '../../components/PromoteTocNav';
import { PROMOTE_SECTIONS, getPromoteTocEntries } from '../../lib/promote';

export const metadata = {
  title: '漫步推薦',
  description:
    '旅宿、閱讀與好物：斑泥整理的合作導購與推薦清單，支持網站維運而不另加價。',
};

const SECTION_ICONS = {
  travel: MapPin,
  read: BookOpen,
  other: Package,
};

export default function PromotePage() {
  const tocEntries = getPromoteTocEntries();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-gray-50 py-12 px-4 pb-24 text-[#333333] sm:px-6 sm:py-16">
      <PromoteHashScroll />
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto mb-6 max-w-3xl text-center lg:mb-10">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-amber-700/90">
            Affiliate & picks
          </p>
          <h1 className="font-serif text-3xl font-bold tracking-wide text-amber-950 sm:text-4xl">
            漫步推薦
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-600">
            這裡是我整理過的旅宿、讀物與常用服務。標示為合作連結的項目，若你點擊並完成消費，我會收到平台給創作者的回饋——
            <strong className="font-medium text-gray-700">你支付的價格不會因此變貴</strong>
            ，但能支持我繼續寫作、拍照與維護網站。
          </p>
        </header>

        <div className="lg:grid lg:grid-cols-[minmax(200px,240px)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:gap-14">
          <PromoteTocNav entries={tocEntries} />

          <div className="min-w-0">
            <div className="space-y-14 lg:space-y-16">
              {PROMOTE_SECTIONS.map((section) => {
                const Icon = SECTION_ICONS[section.id] || Package;
                return (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 lg:scroll-mt-24"
                  >
                    <div className="mb-5 flex items-start gap-3 border-b border-amber-100 pb-3">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 shadow-sm">
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <div>
                        <h2 className="font-serif text-xl font-semibold tracking-wide text-gray-900">
                          {section.title}
                        </h2>
                        <p className="mt-1 text-sm leading-relaxed text-gray-600">{section.lead}</p>
                      </div>
                    </div>

                    {/* 項目多時自動兩欄，單欄仍舒適 */}
                    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4">
                      {section.items.map((item) => (
                        <li
                          key={`${section.id}-${item.title}`}
                          className="flex min-h-[140px] flex-col rounded-2xl border border-amber-100/90 bg-white/90 p-5 shadow-sm ring-1 ring-amber-50"
                        >
                          <h3 className="font-serif text-lg font-semibold text-gray-900">
                            {item.title}
                          </h3>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                            {item.description}
                          </p>
                          {item.href && !item.placeholder ? (
                            <div className="mt-4">
                              <AffiliateLink
                                href={item.href}
                                className="inline-flex items-center rounded-full bg-amber-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-amber-800"
                              >
                                {item.cta || '前往'}
                                <span className="ml-1 text-xs opacity-90" aria-hidden>
                                  ↗
                                </span>
                              </AffiliateLink>
                            </div>
                          ) : (
                            <p className="mt-4 inline-flex w-fit items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800/90">
                              即將更新
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>

            <footer className="mt-14 rounded-2xl border border-gray-200 bg-gray-50/80 px-5 py-4 text-xs leading-relaxed text-gray-600">
              <p className="font-medium text-gray-700">關於合作連結</p>
              <p className="mt-2">
                我會盡量只放自己用過、願意負責推薦的項目；若連結失效或你的使用經驗與我不同，歡迎告訴我。此頁內容會不定期修訂。
              </p>
            </footer>
          </div>
        </div>
      </div>

      <PromoteBackToTop />
    </div>
  );
}
