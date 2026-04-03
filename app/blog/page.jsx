import { Suspense } from 'react';
import { getAllPosts } from '../../lib/posts';
import BlogIndexClient from '../../components/BlogIndexClient';

export const metadata = {
  title: '所有文章',
  description: '網站全部文章列表。',
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto py-16 px-4 text-center text-gray-500 text-sm">載入文章列表…</div>
      }
    >
      <BlogIndexClient posts={posts} />
    </Suspense>
  );
}
