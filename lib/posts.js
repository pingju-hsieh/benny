import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'content');
const COLLECTIONS = ['Life', 'Discussion', 'Travel'];

const formatDateDisplay = (value) => {
  if (!value) return '';
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    .format(d)
    .replace(',', '');
};

const slugify = (input) =>
  String(input)
    .toLowerCase()
    .trim()
    .replace(/\.md$/, '')
    .replace(/[\s_]+/g, '-');

const isCopyFilename = (filename) => /\bcopy\b/i.test(filename);

const isRelativeUrl = (url) => {
  if (!url) return false;
  const u = String(url).trim();
  if (!u) return false;
  if (u.startsWith('#')) return false;
  if (u.startsWith('/')) return false;
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(u)) return false;
  return true;
};

const joinUrl = (base, rel) => {
  const b = String(base ?? '').replace(/\/?$/, '/');
  const r = String(rel ?? '').replace(/^\.\//, '');
  return `${b}${r}`.replace(/\/{2,}/g, '/').replace(':/', '://');
};

const resolveFrontMatterMedia = (value, assetBase) => {
  if (!value) return value;
  if (Array.isArray(value)) return value.map((v) => (isRelativeUrl(v) ? joinUrl(assetBase, v) : v));
  if (typeof value === 'string') return isRelativeUrl(value) ? joinUrl(assetBase, value) : value;
  return value;
};

const resolveMarkdownRelativePaths = (markdown, assetBase) => {
  if (!markdown) return '';
  const base = assetBase;

  const imgRe = /!\[([^\]]*)\]\((\s*<?)([^)\s>]+)(>?)([^)]*)\)/g;
  const out1 = markdown.replace(imgRe, (_m, alt, pre, url, post, rest) => {
    const resolved = isRelativeUrl(url) ? joinUrl(base, url) : url;
    return `![${alt}](${pre}${resolved}${post}${rest})`;
  });

  const linkRe = /\[([^\]]+)\]\((\s*<?)([^)\s>]+)(>?)([^)]*)\)/g;
  return out1.replace(linkRe, (_m, text, pre, url, post, rest) => {
    const resolved = isRelativeUrl(url) ? joinUrl(base, url) : url;
    return `[${text}](${pre}${resolved}${post}${rest})`;
  });
};

async function listMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) continue;
    if (e.isFile() && e.name.endsWith('.md') && !isCopyFilename(e.name)) files.push(full);
  }
  return files;
}

/**
 * 單行 Markdown → 純文字（列表預覽用單行處理）。
 */
function markdownLineToPlainText(line) {
  if (!line) return '';
  let s = String(line);
  if (/^```[\w-]*$/.test(s.trim())) return '';

  s = s.replace(/```/g, '');

  s = s.replace(/`([^`]+)`/g, '$1');
  s = s.replace(/<[^>]+>/g, ' ');
  s = s.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ');
  s = s.replace(/!\[[^\]]*\]\[[^\]]*\]/g, ' ');
  s = s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  s = s.replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1');
  s = s.replace(/<([^>\s]+)>/g, '$1');

  s = s.replace(/^#{1,6}\s+/, '');
  s = s.replace(/^>\s?/, '');
  s = s.replace(/^[\s]*[-*+]\s+(?=\S)/, '');
  s = s.replace(/^[\s]*\d+\.\s+(?=\S)/, '');
  s = s.replace(/^[\s]*[-*_]{3,}[\s]*$/, '');

  s = s.replace(/~~([^~]+)~~/g, '$1');
  s = s.replace(/\*\*([^*]+)\*\*/g, '$1');
  s = s.replace(/__([^_]+)__/g, '$1');
  s = s.replace(/\*([^*\n]+)\*/g, '$1');
  s = s.replace(/_([^_\n]+)_/g, '$1');
  s = s.replace(/\[\^[^\]]+\]/g, '');
  s = s.replace(/\|/g, ' ');

  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

/**
 * 列表／搜尋預覽用：只取正文前 N 行（保留換行），每行去 md 語法；後面還有內容時結尾加 …。
 * 新詩等多行內容不會再被併成一段而整首顯示。
 */
export function markdownToPlainTextExcerpt(markdown, maxLines = 3) {
  const raw = String(markdown ?? '').replace(/\r\n/g, '\n');
  if (!raw.trim()) return '';

  const lines = raw.split('\n');
  let start = 0;
  while (start < lines.length && lines[start].trim() === '') start += 1;

  const rest = lines.slice(start);
  const picked = rest.slice(0, maxLines);
  const plainLines = picked.map((line) => markdownLineToPlainText(line));
  let text = plainLines.join('\n').trim();

  const truncated = rest.length > maxLines;
  if (truncated) text += '…';

  return text;
}

function buildPost({ collection, filePath, raw }) {
  const filename = path.basename(filePath, '.md');
  const slug = slugify(filename);
  const assetBase = `/content/${collection}/${filename}/`;

  const parsed = matter(raw);
  const fm = parsed.data ?? {};
  const rawDate = fm.date;
  const dateObj = rawDate ? new Date(rawDate) : null;
  const dateISO = dateObj && !Number.isNaN(dateObj.getTime()) ? dateObj.toISOString().slice(0, 10) : undefined;
  const dateDisplay = formatDateDisplay(rawDate);

  const body = parsed.content ?? '';
  const excerpt = markdownToPlainTextExcerpt(body, 3);

  const contentResolved = resolveMarkdownRelativePaths(body, assetBase);

  return {
    ...fm,
    collection,
    filename,
    slug,
    assetBase,
    date: dateISO ?? (rawDate ? String(rawDate) : undefined),
    dateISO,
    dateDisplay,
    excerpt,
    thumbnail: resolveFrontMatterMedia(fm.thumbnail, assetBase),
    images: resolveFrontMatterMedia(fm.images, assetBase),
    info: fm.info ? String(fm.info) : '',
    author: fm.author ? String(fm.author) : undefined,
    series: fm.series ? String(fm.series) : undefined,
    tags: Array.isArray(fm.tags) ? fm.tags.map(String) : fm.tags ? [String(fm.tags)] : [],
    content: body,
    contentResolved,
  };
}

export async function getAllPosts() {
  const all = [];
  for (const collection of COLLECTIONS) {
    const dir = path.join(CONTENT_ROOT, collection);
    try {
      const stat = await fs.stat(dir);
      if (!stat.isDirectory()) continue;
    } catch {
      continue;
    }
    const files = await listMarkdownFiles(dir);
    for (const filePath of files) {
      const raw = await fs.readFile(filePath, 'utf8');
      all.push(buildPost({ collection, filePath, raw }));
    }
  }
  // 依 slug 去重，避免同一篇文章重複出現在多個位置（例如大小寫目錄）
  const bySlug = new Map();
  for (const post of all) {
    if (!bySlug.has(post.slug)) bySlug.set(post.slug, post);
  }
  const unique = Array.from(bySlug.values());
  return unique.sort((a, b) => new Date(b.dateISO ?? b.date) - new Date(a.dateISO ?? a.date));
}

export async function getPostsByCollection(collection) {
  const all = await getAllPosts();
  return all.filter((p) => p.collection === collection);
}

export async function getPostBySlug(slug) {
  const all = await getAllPosts();
  return all.find((p) => p.slug === slug) ?? null;
}

