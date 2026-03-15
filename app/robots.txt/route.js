import { getAllPosts } from '../../lib/posts';

export async function GET() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  await getAllPosts();

  const lines = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${site.replace(/\/$/, '')}/sitemap.xml`,
    '',
  ];

  // If you ever want to disallow certain paths, add here.
  // For now, we keep it indexable for SEO.

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

