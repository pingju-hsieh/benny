/**
 * 建置前將 content/ 內影片複製到 public/content/，
 * 讓 Netlify / Next 以靜態檔提供（Safari 需要正確的 Range，CDN 較不易快取錯誤的 200）。
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, 'content');
const PUBLIC_ROOT = path.join(ROOT, 'public', 'content');
const VIDEO_EXT = new Set(['.mp4', '.mov', '.webm']);

async function walk(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walk(full, files);
    else if (e.isFile() && VIDEO_EXT.has(path.extname(e.name).toLowerCase())) files.push(full);
  }
  return files;
}

const sources = await walk(CONTENT_ROOT);
let copied = 0;

for (const src of sources) {
  const rel = path.relative(CONTENT_ROOT, src);
  const dest = path.join(PUBLIC_ROOT, rel);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);
  copied += 1;
  console.log(`[sync-content-videos] ${rel}`);
}

console.log(`[sync-content-videos] done (${copied} file(s))`);
