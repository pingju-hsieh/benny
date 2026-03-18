import { marked } from 'marked';
import { parseGalleryBlocks } from './galleryParser';

/**
 * Parse markdown with category-specific rendering.
 * 攝影集：標準 Markdown 解析，回傳 blocks 供 GalleryEditorialLayout 使用。
 * 新詩：保留空白行，由 PoetryPostContent 套用樣式。
 */
export function parseMarkdownForCategory(content, category) {
  if (!content) return { html: '', blocks: null };

  let toParse = content;
  if (category === '新詩') {
    // 保留詩的空白行：雙換行後的額外換行轉成佔位，marked 預設會壓縮連續空行
    toParse = toParse.replace(/(\n\n)\n+/g, (match) =>
      '\n\n' + '<p class="poetry-stanza-gap"></p>\n\n'.repeat(Math.max(0, match.length - 2))
    );
  }

  marked.setOptions({ gfm: true, breaks: true, headerIds: false, mangle: false });
  const html = marked.parse(toParse);

  if (category === '攝影集') {
    const blocks = parseGalleryBlocks(html);
    return { html, blocks };
  }

  return { html, blocks: null };
}
