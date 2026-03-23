/**
 * 漫步推薦頁：分類與連結（可隨時增刪；外部連結請配合 AffiliateLink 使用）。
 * placeholder: true 時僅顯示說明，不顯示外連按鈕。
 *
 * tocLabel：目錄捷徑用短名（側欄／手機橫列）；不填則用 title。
 */
export const PROMOTE_SECTIONS = [
  {
    id: 'travel',
    title: '旅宿與行程',
    tocLabel: '旅宿與行程',
    lead: '出門找住宿與行程；透過連結訂房我會收到平台分潤，你的價格不會變。',
    items: [
      {
        title: 'Booking.com',
        description:
          '從小鎮到城市公寓，比價與預訂最順手；適合自由行、願意自己挑房的人。',
        href: 'https://www.booking.com/',
        cta: '前往訂房',
      },
    ],
  },
  {
    id: 'read',
    title: '閱讀與好物',
    tocLabel: '閱讀與好物',
    lead: '書、文具與常用物：我會持續補上，並簡短說明為什麼推薦。',
    items: [
      {
        title: '搜集中',
        description:
          '推薦連結正在蒐集；如果你想看特定類型，歡迎留言/寫信。',
        href: null,
        placeholder: true,
      },
    ],
  },
  {
    id: 'other',
    title: '其他常用服務',
    tocLabel: '其他',
    lead: '雲端與生活工具：只放我確實長期在用的。',
    items: [
      {
        title: '搜集中',
        description:
          '例如雲端空間、修圖或寫作工具——先試用，確定長期好用再放上。',
        href: null,
        placeholder: true,
      },
    ],
  },
];

/** 給目錄／導覽用 */
export function getPromoteTocEntries() {
  return PROMOTE_SECTIONS.map((s) => ({
    id: s.id,
    label: s.tocLabel || s.title,
  }));
}
