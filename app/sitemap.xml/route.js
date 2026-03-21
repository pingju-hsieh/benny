import { getAllPosts } from '../../lib/posts';

const toIso = (value) => {
  const d = value ? new Date(value) : null;
  return d && !Number.isNaN(d.getTime()) ? d.toISOString() : new Date().toISOString();
};

export async function GET() {
  const site = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
  const posts = await getAllPosts();

  const staticUrls = [
    { loc: `${site}/`, changefreq: 'weekly', priority: '1.0' },
    { loc: `${site}/salon`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${site}/travel`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${site}/discussion`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${site}/sentiment`, changefreq: 'weekly', priority: '0.7' },
    { loc: `${site}/blog`, changefreq: 'daily', priority: '0.9' },
    { loc: `${site}/about`, changefreq: 'yearly', priority: '0.4' },
    { loc: `${site}/promote`, changefreq: 'monthly', priority: '0.5' },
  ];

  const postUrls = posts.map((p) => ({
    loc: `${site}/posts/${p.slug}`,
    lastmod: toIso(p.dateISO ?? p.date),
    changefreq: 'monthly',
    priority: '0.7',
  }));

  const urls = [...staticUrls, ...postUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}

