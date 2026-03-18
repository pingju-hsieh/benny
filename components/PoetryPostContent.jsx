'use client';

const POETRY_MONTH_NAMES = {
  1: '開歲',
  2: '紺香',
  3: '桃良',
  4: '秀蔓',
  5: '鳴蜩',
  6: '精陽',
  7: '流火',
  8: '未央',
  9: '授衣',
  10: '獲稻',
  11: '龍潛',
  12: '嘉年',
};

const NUM_TO_BIG = {
  0: '零',
  1: '壹',
  2: '貳',
  3: '參',
  4: '肆',
  5: '伍',
  6: '陸',
  7: '漆',
  8: '捌',
  9: '玖',
};

function yearToBig(year) {
  return String(year)
    .split('')
    .map((c) => NUM_TO_BIG[c] ?? c)
    .join('');
}

export default function PoetryPostContent({ html, title, date }) {
  let signature = '斑泥';
  if (title) signature += ` 〈${title}〉`;
  if (date) {
    const d = new Date(date);
    if (!Number.isNaN(d.getTime())) {
      const year2 = d.getFullYear() % 100;
      signature += yearToBig(year2);
      const monthName = POETRY_MONTH_NAMES[d.getMonth() + 1];
      if (monthName) signature += ` ${monthName}`;
    }
  }

  return (
    <div
      className="poetry-sheet select-none relative bg-amber-50/40 font-serif leading-[2.5] tracking-widest text-[#333333] rounded-2xl px-10 sm:px-14 py-6 sm:py-8"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={{ userSelect: 'none' }}
    >
      {title ? (
        <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-widest leading-[2.5] text-[#333333] mb-6">
          {title}
        </h1>
      ) : null}
      <div
        className="poetry-content relative z-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {/* Transparent overlay to prevent text selection / right-click on words */}
      <div className="absolute inset-0 z-10 rounded-2xl cursor-default" aria-hidden="true" />
      <p className="mt-10 text-center text-amber-800/80 text-sm font-serif tracking-[0.2em]">
        {signature}
      </p>
    </div>
  );
}
