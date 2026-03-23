import { getAllPosts } from '../../lib/posts';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://banni-walks.com').replace(/\/$/, '');
const SITE_NAME = '斑泥走走';
const SITE_DESC = '文學、旅行攝影與經濟思辨的個人創作網站。';

function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRfcDate(value) {
  if (!value) return new Date().toUTCString();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString();
}

export async function GET() {
  const posts = await getAllPosts();
  const latestDate = posts[0]?.dateISO || posts[0]?.date || new Date().toISOString();

  const items = posts
    .map((post) => {
      const title = post.title || '文章';
      const link = `${SITE_URL}/posts/${post.slug}`;
      const description = post.info || post.excerpt || '';
      const pubDate = toRfcDate(post.dateISO ?? post.date);
      const guid = link;

      return `<item>
  <title>${escapeXml(title)}</title>
  <link>${escapeXml(link)}</link>
  <guid isPermaLink="true">${escapeXml(guid)}</guid>
  <pubDate>${escapeXml(pubDate)}</pubDate>
  <description>${escapeXml(description)}</description>
</item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(SITE_NAME)}</title>
  <link>${escapeXml(SITE_URL)}</link>
  <description>${escapeXml(SITE_DESC)}</description>
  <language>zh-Hant</language>
  <lastBuildDate>${escapeXml(toRfcDate(latestDate))}</lastBuildDate>
  <atom:link href="${escapeXml(`${SITE_URL}/feed.xml`)}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
    },
  });
}

