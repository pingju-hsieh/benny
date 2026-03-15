import fs from 'node:fs/promises';
import path from 'node:path';

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
    default:
      return 'application/octet-stream';
  }
};

export async function GET(_req, { params }) {
  const parts = (params?.path ?? []).map((p) => String(p));
  if (parts.length === 0) return new Response('Not found', { status: 404 });

  // Prevent path traversal
  if (parts.some((p) => p.includes('..') || p.includes('\\'))) {
    return new Response('Bad request', { status: 400 });
  }

  const filePath = path.join(CONTENT_ROOT, ...parts);
  const normalizedRoot = path.resolve(CONTENT_ROOT);
  const normalizedFile = path.resolve(filePath);
  if (!normalizedFile.startsWith(normalizedRoot)) {
    return new Response('Bad request', { status: 400 });
  }

  try {
    const data = await fs.readFile(normalizedFile);
    const ext = path.extname(normalizedFile);
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': mimeFromExt(ext),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}

