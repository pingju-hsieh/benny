import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import { getAllPosts } from '../lib/getPosts';

const PostDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getAllPosts().then((all) => {
      const found = all.find((p) => p.slug === slug);
      // if (found) {
      //   // 強制所有Date物件都直接轉字串（安全防呆）
      //   Object.keys(found).forEach((key) => {
      //     if (found[key] instanceof Date) {
      //       found[key] = found[key].toISOString().slice(0, 10); // 或用你的格式
      //     }
      //   });
      //   setPost(found);
      // } else {
      //   setPost(null);
      // }
    });
  }, [slug]);

  if (!post) return <div className="p-6 text-center">文章載入中...</div>;

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-serif mb-4">{post.title}</h1>
      {/* <p className="text-sm text-gray-500 mb-6">
        {post.date ? post.date : ''}
      </p> */}
      <div
        className="prose lg:prose-lg"
        dangerouslySetInnerHTML={{ __html: marked(post.content) }}
      />
    </div>
  );
};

export default PostDetailPage;
