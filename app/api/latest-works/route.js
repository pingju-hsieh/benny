import { getAllPosts } from '../../../lib/posts';

export async function GET() {
  const posts = await getAllPosts();

  const pickLatest = (collection) =>
    posts.find((p) => p.collection === collection) || null;

  const data = {
    Life: pickLatest('Life'),
    Travel: pickLatest('Travel'),
    Discussion: pickLatest('Discussion'),
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
    },
  });
}

