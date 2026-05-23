import { createReadStream } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

const mimeFromExt = (ext) => {
  switch (ext.toLowerCase()) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    case '.pdf':
      return 'application/pdf';
    case '.mp4':
      return 'video/mp4';
    case '.mov':
      return 'video/quicktime';
    case '.webm':
      return 'video/webm';
    default:
      return 'application/octet-stream';
  }
};

/** @returns {{ start: number, end: number } | 'unsatisfiable' | null} */
function parseRangeHeader(rangeHeader, size) {
  if (!rangeHeader?.startsWith('bytes=')) return null;

  const spec = rangeHeader.replace(/^bytes=/, '').trim();
  const [startStr, endStr] = spec.split('-');
  let start = startStr !== '' ? Number.parseInt(startStr, 10) : NaN;
  let end = endStr !== '' ? Number.parseInt(endStr, 10) : NaN;

  if (startStr === '' && !Number.isNaN(end)) {
    // suffix range: bytes=-500
    const suffixLength = end;
    start = Math.max(0, size - suffixLength);
    end = size - 1;
  } else if (Number.isNaN(start)) {
    return null;
  } else if (Number.isNaN(end)) {
    end = size - 1;
  }

  if (start < 0 || end < start || start >= size) return 'unsatisfiable';
  end = Math.min(end, size - 1);
  return { start, end };
}

const VIDEO_EXTS = new Set(['.mp4', '.mov', '.webm']);

/** 圖片可長期快取；影片需 Vary: Range，避免 CDN 把整包 200 回給 Safari 的 Range 請求 */
function cacheHeadersFor(ext) {
  if (VIDEO_EXTS.has(ext.toLowerCase())) {
    return {
      'Cache-Control': 'public, max-age=3600, must-revalidate',
      Vary: 'Range',
    };
  }
  return {
    'Cache-Control': 'public, max-age=31536000, immutable',
  };
}

export async function GET(req, { params }) {
  const parts = (params?.path ?? []).map((p) => String(p));
  if (parts.length === 0) return new Response('Not found', { status: 404 });

  if (parts.some((p) => p.includes('..') || p.includes('\\'))) {
    return new Response('Bad request', { status: 400 });
  }

  const filePath = path.join(CONTENT_ROOT, ...parts);
  const normalizedRoot = path.resolve(CONTENT_ROOT);
  const normalizedFile = path.resolve(filePath);
  if (!normalizedFile.startsWith(normalizedRoot)) {
    return new Response('Bad request', { status: 400 });
  }

  let stat;
  try {
    stat = await fs.stat(normalizedFile);
    if (!stat.isFile()) return new Response('Not found', { status: 404 });
  } catch {
    return new Response('Not found', { status: 404 });
  }

  const size = stat.size;
  const ext = path.extname(normalizedFile);
  const contentType = mimeFromExt(ext);
  const cacheHeaders = cacheHeadersFor(ext);
  const rangeHeader = req.headers.get('range');
  const range = rangeHeader ? parseRangeHeader(rangeHeader, size) : null;

  if (range === 'unsatisfiable') {
    return new Response(null, {
      status: 416,
      headers: {
        'Content-Range': `bytes */${size}`,
      },
    });
  }

  if (range) {
    const { start, end } = range;
    const length = end - start + 1;
    const stream = createReadStream(normalizedFile, { start, end });

    return new Response(Readable.toWeb(stream), {
      status: 206,
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(length),
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Accept-Ranges': 'bytes',
        ...cacheHeaders,
      },
    });
  }

  const data = await fs.readFile(normalizedFile);
  return new Response(data, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Length': String(size),
      'Accept-Ranges': 'bytes',
      ...cacheHeaders,
    },
  });
}
