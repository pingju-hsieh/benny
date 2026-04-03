'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Filter } from 'lucide-react';
import { usePostListFiltersFromUrl } from '../hooks/usePostListFiltersFromUrl';

const COLLECTION_STYLES = {
  Life: {
    label: '文字日常',
    className: 'bg-amber-100 text-amber-700',
  },
  Travel: {
    label: '遊記攝影',
    className: 'bg-blue-100 text-blue-700',
  },
  Discussion: {
    label: '經濟討論',
    className: 'bg-green-100 text-green-700',
  },
};

function getCollectionStyle(collection) {
  return (
    COLLECTION_STYLES[collection] || {
      label: collection || '其他',
      className: 'bg-gray-100 text-gray-700',
    }
  );
}

export default function BlogIndexClient({ posts }) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = usePostListFiltersFromUrl(posts);
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (searchParams.get('category') || searchParams.get('series')) setShowFilters(true);
  }, [searchParams]);

  const tags = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['全部', ...Array.from(set)];
  }, [posts]);

  const seriesList = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => {
      if (p.series) set.add(p.series);
    });
    return ['全部', ...Array.from(set)];
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (filters.category !== '全部' && p.category !== filters.category) return false;
      if (filters.series !== '全部' && p.series !== filters.series) return false;
      if (!query.trim()) return true;
      const q = query.trim().toLowerCase();
      const haystack = [
        p.title,
        p.info,
        p.excerpt,
        p.category,
        p.series,
        Array.isArray(p.tags) ? p.tags.join(' ') : '',
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [filters.category, filters.series, query, posts]);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-serif text-center mb-6 border-b pb-4">所有文章</h1>

      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜尋標題、摘要、分類或系列關鍵字..."
            className="w-full rounded-full border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          className={`shrink-0 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition ${
            showFilters
              ? 'bg-amber-600 text-white border-amber-600'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-amber-50 hover:border-amber-300'
          }`}
        >
          <Filter className="w-4 h-4" />
          <span>篩選</span>
        </button>
      </div>

      {showFilters && (
        <div className="mb-8 space-y-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag) => {
              const isActive = tag === filters.category;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, category: tag }))}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                    isActive
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-amber-50 hover:border-amber-300'
                  }`}
                >
                  {tag === '全部' ? '全部分類' : tag}
                </button>
              );
            })}
          </div>

          {seriesList.length > 1 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {seriesList.map((s) => {
                const isActive = s === filters.series;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, series: s }))}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium border transition ${
                      isActive
                        ? 'bg-amber-700 text-white border-amber-700'
                        : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100 hover:border-amber-300'
                    }`}
                  >
                    {s === '全部' ? '全部系列' : s}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {filtered.map((post) => {
        const style = getCollectionStyle(post.collection);
        const showExcerpt = post.collection !== 'Discussion';

        return (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block mb-10 p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="mb-2">
              <div className="flex flex-wrap items-center gap-2">
                {post.collection ? (
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${style.className}`}
                  >
                    {style.label}
                  </span>
                ) : null}
                {post.category ? (
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    {post.category}
                  </span>
                ) : null}
                {post.series ? (
                  <span className="text-xs sm:text-sm font-serif font-bold text-amber-700 tracking-wide">
                    {post.series}
                  </span>
                ) : null}
                {(post.dateDisplay || post.date) ? (
                  <span className="text-xs text-gray-500">發表於{post.dateDisplay || post.date}</span>
                ) : null}
              </div>
            </div>

            <h2 className="text-2xl font-serif text-[#333333] mb-2">{post.title}</h2>
            {post.info ? <p className="text-gray-600 mb-2">{post.info}</p> : null}

            {showExcerpt && post.excerpt ? (
              <p className="text-gray-700 line-clamp-3 whitespace-pre-line">{post.excerpt}</p>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}
