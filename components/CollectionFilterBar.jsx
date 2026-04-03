'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter } from 'lucide-react';

export default function CollectionFilterBar({ posts, filters, onFilterChange }) {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const activeCategory = filters?.category ?? '全部';
  const activeSeries = filters?.series ?? '全部';

  useEffect(() => {
    const c = searchParams.get('category');
    const s = searchParams.get('series');
    if (c || s) setShowFilters(true);
  }, [searchParams]);

  const categories = useMemo(() => {
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

  const handleChange = (nextCategory, nextSeries) => {
    if (onFilterChange) onFilterChange({ category: nextCategory, series: nextSeries });
  };

  return (
    <div className="mb-6">
      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition ${
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
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleChange(cat, activeSeries)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                    isActive
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-amber-50 hover:border-amber-300'
                  }`}
                >
                  {cat === '全部' ? '全部分類' : cat}
                </button>
              );
            })}
          </div>

          {seriesList.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {seriesList.map((s) => {
                const isActive = s === activeSeries;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleChange(activeCategory, s)}
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
    </div>
  );
}
