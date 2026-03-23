import { MapPin, BookOpen, Package } from 'lucide-react';
import AffiliateLink from './AffiliateLink';
import { PROMOTE_SECTIONS } from '../lib/promote';

const SECTION_ICONS = {
  travel: MapPin,
  read: BookOpen,
  other: Package,
};

/** 漫步推薦：可捲動清單本體（置於 PromoteScrollLayout 捲動區內） */
export default function PromoteSections() {
  return (
    <>
      <div className="space-y-14 lg:space-y-16">
        {PROMOTE_SECTIONS.map((section) => {
          const Icon = SECTION_ICONS[section.id] || Package;
          return (
            <section key={section.id} id={section.id} className="scroll-mt-2">
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

              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4">
                {section.items.map((item) => (
                  <li
                    key={`${section.id}-${item.title}`}
                    className="flex min-h-[140px] flex-col rounded-2xl border border-amber-100/90 bg-white/90 p-5 shadow-sm ring-1 ring-amber-50"
                  >
                    <h3 className="font-serif text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{item.description}</p>
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
                        {item.placeholder ? '搜集中' : '即將更新'}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
