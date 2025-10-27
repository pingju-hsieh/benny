import matter from 'gray-matter';

export const getAllPosts = async () => {
  const files = import.meta.glob('../posts/*.md', { as: 'raw' });

  const posts = await Promise.all(
    Object.entries(files).map(async ([path, resolver]) => {
      const raw = await resolver();
      const { data, content } = matter(raw);

      const slug = path.split('/').pop().replace(/\.md$/, '');

      return {
        ...data,
        content,
        slug,
      };
    })
  );

  // 按照日期排序（新到舊）
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};