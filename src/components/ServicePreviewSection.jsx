import React from 'react';
import { GraduationCap, BarChart3, PenTool, Globe2 } from 'lucide-react';
import Link from 'next/link';

const items = [
  {
    id: 'academic',
    title: '留學諮詢',
    description: '歐陸頂尖經濟碩士申請策略與經驗傳承。',
    icon: GraduationCap,
  },
  {
    id: 'io',
    title: '經濟顧問',
    description: '實證 IO、定價策略與巨量資料分析。',
    icon: BarChart3,
  },
  {
    id: 'writing',
    title: '深度撰文',
    description: '產經政策、社會觀察與文學評論。',
    icon: PenTool,
  },
  {
    id: 'travel',
    title: '旅遊影像',
    description: '30+ 國家的深度旅記與影像授權。',
    icon: Globe2,
  },
];

const ServicePreviewSection = () => {
  return (
    <section className="py-16 border-t border-gray-100">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-0">
        <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#333333] mb-4">
          專業合作與諮詢
        </h2>
        <div className="w-24 h-0.5 bg-amber-500 mx-auto mb-6" />
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
          跨越學術與實務的邊界，將艱深的經濟邏輯轉化為商業洞察與文字溫度。
        </p>
      </div>

      <div className="mt-10 max-w-5xl mx-auto px-4 sm:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={`/service#${item.id}`}
                className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-5 flex flex-col items-start justify-between hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center rounded-full bg-amber-50 text-amber-700 w-9 h-9">
                    <Icon className="w-4 h-4" />
                  </span>
                  <h3 className="text-base font-serif font-semibold text-[#333333]">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/service"
            className="inline-flex items-center justify-center rounded-full border border-amber-700 px-6 py-2 text-sm font-medium text-amber-700 hover:bg-amber-700 hover:text-white transition-colors duration-200"
          >
            探索合作可能 →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicePreviewSection;

