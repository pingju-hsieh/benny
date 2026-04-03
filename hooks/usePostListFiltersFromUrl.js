'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const DEFAULT = { category: '全部', series: '全部' };

/**
 * 從 ?category= & ?series= 還原篩選；數值須存在於目前 posts 的 front matter 才會套用。
 */
export function usePostListFiltersFromUrl(posts) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(DEFAULT);

  useEffect(() => {
    const categorySet = new Set(posts.map((p) => p.category).filter(Boolean).map(String));
    const seriesSet = new Set(posts.map((p) => p.series).filter(Boolean).map(String));

    const catParam = searchParams.get('category');
    const serParam = searchParams.get('series');

    let category = DEFAULT.category;
    let series = DEFAULT.series;

    if (catParam && categorySet.has(catParam)) category = catParam;
    if (serParam && seriesSet.has(serParam)) series = serParam;

    setFilters((prev) => {
      if (prev.category === category && prev.series === series) return prev;
      return { category, series };
    });
  }, [searchParams, posts]);

  return [filters, setFilters];
}
