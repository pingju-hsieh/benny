'use client';

import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const COLLECTION_META = {
  Life: {
    label: '文字日常',
    view: '/salon',
    colorClass: 'text-amber-700 border-amber-700 bg-amber-100',
    hoverBorderClass: 'hover:border-amber-500',
  },
  Travel: {
    label: '遊記攝影',
    view: '/travel',
    colorClass: 'text-blue-700 border-blue-700 bg-blue-100',
    hoverBorderClass: 'hover:border-blue-500',
  },
  Discussion: {
    label: '經濟討論',
    view: '/discussion',
    colorClass: 'text-green-700 border-green-700 bg-green-100',
    hoverBorderClass: 'hover:border-green-500',
  },
};

const LatestWorksSection = React.memo(function LatestWorksSection({ onNavigate }) {
  const [items, setItems] = useState([]);

  const go = (path) => {
    if (onNavigate) onNavigate(path);
  };

  useEffect(() => {
    let cancelled = false;
    fetch('/api/latest-works')
      .then((res) => res.json())
      .then((data) => {
        if (cancelled || !data) return;
        const list = [];
        ['Life', 'Travel', 'Discussion'].forEach((key) => {
          const post = data[key];
          if (!post) return;
          const meta = COLLECTION_META[key];
          list.push({
            title: post.title,
            info: post.info,
            date: post.dateDisplay || post.date || '',
            view: meta.view,
            collectionLabel: meta.label,
            subCategory: post.category || '',
            colorClass: meta.colorClass,
            hoverBorderClass: meta.hoverBorderClass,
          });
        });
        setItems(list);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="py-16 border-t border-gray-200">
      <div className="text-center">
        <h3 className="text-4xl font-serif text-center text-[#333333] mb-12 border-b-2 border-amber-500 pb-3 inline-block mx-auto">
          最新作品
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {items.map((work, index) => (
          <div
            key={index}
            className={`p-6 md:min-h-[420px] bg-white rounded-lg shadow-xl transition duration-300 hover:shadow-2xl hover:-translate-y-2 transform border-t-4 border-b-4 border-transparent ${work.hoverBorderClass} flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className={`inline-block text-xs font-semibold py-1 px-3 rounded-full uppercase ${work.colorClass}`}>
                  {work.collectionLabel}
                </span>
                {work.subCategory && (
                  <span className="inline-block text-xs font-medium py-1 px-3 rounded-full bg-gray-100 text-gray-600">
                    {work.subCategory}
                  </span>
                )}
              </div>

              <h4
                className="text-xl font-semibold text-gray-800 mt-3 hover:text-gray-900 cursor-pointer transition"
                onClick={() => go(work.view)}
              >
                {work.title}
              </h4>

              <p className="text-sm text-gray-500 mt-2">
                <Clock className="w-3 h-3 inline mr-1" />
                {work.date}
              </p>

              {work.info && (
                <p className="text-gray-600 text-base mt-3 leading-relaxed line-clamp-3">
                  {work.info}
                </p>
              )}
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => go(work.view)}
                className={`text-sm font-medium ${work.colorClass
                  .split(' ')
                  .filter(c => !c.startsWith('bg-'))
                  .join(' ')} border px-4 py-1 rounded-full hover:opacity-80 transition duration-300`}
              >
                查看「{work.collectionLabel}」
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default LatestWorksSection;