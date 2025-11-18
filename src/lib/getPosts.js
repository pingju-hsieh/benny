import fm from 'front-matter';

export const getAllPosts = async () => {
  const files = import.meta.glob('../posts/*.md', { as: 'raw' });

  const posts = await Promise.all(
    Object.entries(files).map(async ([path, resolver]) => {
      const raw = await resolver();

      // 使用 front-matter 解析 metadata + body
      const parsed = fm(raw);

      const slug = path.split('/').pop().replace(/\.md$/, '');

      return {
        ...parsed.attributes,   // YAML 資訊
        content: parsed.body,   // markdown 內容（尚未轉 HTML）
        slug,
      };
    })
  );

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};