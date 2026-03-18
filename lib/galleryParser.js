/**
 * 圖下方文字：以空行分界，空行前的進負空間，空行後的獨立 block。
 * 對應 markdown 的雙換行（空一行）= 新段落，第一個空行前的段落群組進負空間。
 */
function splitAtBlankLine(html) {
  if (!html || !html.trim()) return [html.trim()];
  const pRe = /<p(?:\s[^>]*)?>[\s\S]*?<\/p>/gi;
  const matches = [];
  let m;
  while ((m = pRe.exec(html)) !== null) {
    matches.push(m.index + m[0].length);
  }
  if (matches.length <= 1) return [html.trim()];
  const cut = matches[0];
  const first = html.slice(0, cut).trim();
  const rest = html.slice(cut).trim();
  return rest ? [first, rest] : [first];
}

/**
 * 在 H1/H2 邊界切分文字，到 H2 之前都跟上一張圖同一 block，H2 往下是新 block。
 * 非 H2 的內容若有多個段落（空行分開），僅空行前進負空間，空行後獨立。
 */
function splitTextAtHeadings(html) {
  if (!html || !html.trim()) return [];
  const results = [];
  const re = /<\s*h[12]\b/gi;
  let m;
  const starts = [];
  while ((m = re.exec(html)) !== null) {
    starts.push(m.index);
  }
  if (starts.length === 0) {
    splitAtBlankLine(html).forEach((h) => results.push({ type: 'text', html: h }));
    return results;
  }
  const beforeFirst = html.slice(0, starts[0]).trim();
  if (beforeFirst) {
    splitAtBlankLine(beforeFirst).forEach((h) => results.push({ type: 'text', html: h }));
  }
  for (let i = 0; i < starts.length; i++) {
    const end = i + 1 < starts.length ? starts[i + 1] : html.length;
    const chunk = html.slice(starts[i], end).trim();
    if (chunk) results.push({ type: 'text', html: chunk });
  }
  return results;
}

/**
 * 解析攝影集 HTML，完整保留所有 Markdown 結構。
 * 節點分為：影像單元 (IMG + EM) 與 文字內容。文字在 H2 邊界切分。
 */
export function parseGalleryBlocks(html) {
  if (!html) return [];

  const blocks = [];
  let imgIndex = 0;

  const imgBlockRe = /<p>\s*(<img[^>]+>)\s*<\/p>\s*(?:<p>\s*(<em[^>]*>[\s\S]*?<\/em>)\s*<\/p>)?/g;

  let lastEnd = 0;
  let match;

  while ((match = imgBlockRe.exec(html)) !== null) {
    const beforeHtml = html.slice(lastEnd, match.index).trim();
    if (beforeHtml) {
      const split = splitTextAtHeadings(beforeHtml);
      split.forEach((b) => blocks.push(b));
    }

    const imgTag = match[1];
    const captionHtml = match[2] || null;
    const srcMatch = imgTag.match(/src="([^"]*)"/);
    const altMatch = imgTag.match(/alt="([^"]*)"/);

    blocks.push({
      type: 'image',
      src: (srcMatch && srcMatch[1]) || '',
      alt: (altMatch && altMatch[1]) || '',
      captionHtml,
      index: imgIndex++,
    });
    lastEnd = match.index + match[0].length;
  }

  const afterHtml = html.slice(lastEnd).trim();
  if (afterHtml) {
    const split = splitTextAtHeadings(afterHtml);
    split.forEach((b) => blocks.push(b));
  }

  return blocks;
}
