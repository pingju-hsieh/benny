/**
 * 文章所屬 collection 對應的列表頁路徑（與導覽一致）。
 */
export function getListingPathForCollection(collection) {
  switch (collection) {
    case 'Life':
      return '/salon';
    case 'Travel':
      return '/travel';
    case 'Discussion':
      return '/discussion';
    default:
      return '/blog';
  }
}

/**
 * 產生帶 category / series 查詢參數的列表連結（值須與 front matter 完全一致）。
 */
export function buildPostListFilterHref(collection, { category, series } = {}) {
  const base = getListingPathForCollection(collection);
  const params = new URLSearchParams();
  const c = category != null ? String(category).trim() : '';
  const s = series != null ? String(series).trim() : '';
  if (c) params.set('category', c);
  if (s) params.set('series', s);
  const q = params.toString();
  return q ? `${base}?${q}` : base;
}
