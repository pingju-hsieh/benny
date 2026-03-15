import { getAllPosts } from '../../lib/posts';
import BlogIndexClient from '../../components/BlogIndexClient';

export const metadata = {
  title: '所有文章',
  description: '網站全部文章列表。',
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogIndexClient posts={posts} />;
}
