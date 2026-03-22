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
    lead: '出門時我實際用來找住宿、排行程的工具；若你透過連結完成訂房，平台會分潤給我，金額不另加在你帳單上。',
    items: [
      {
        title: 'Booking.com',
        description:
          '從歐陸小鎮到城市公寓，我多半在這裡比價與預訂；適合自由行、願意自己挑房的人。',
        href: 'https://www.booking.com/',
        cta: '前往訂房',
      },
    ],
  },
  {
    id: 'read',
    title: '閱讀與好物',
    tocLabel: '閱讀與好物',
    lead: '書、文具或長期用順手的物件；會慢慢補上，每項都會簡短說明為什麼值得。',
    items: [
      {
        title: '清單籌備中',
        description:
          '詩集、散文與工具書的推薦連結之後會放在這裡；若你有想看的類型，也歡迎寫信跟我說。',
        href: null,
        placeholder: true,
      },
    ],
  },
  {
    id: 'other',
    title: '其他常用服務',
    tocLabel: '其他',
    lead: '雲端、軟體或生活服務類；只放我確實訂閱或付費使用過的。',
    items: [
      {
        title: '待補上',
        description: '例如雲端空間、修圖或寫作相關工具——確定會長期用再放上來。',
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
