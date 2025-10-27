import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllPosts } from '../lib/getPosts';
import { marked } from 'marked';

const PostDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getAllPosts().then((posts) => {
      const found = posts.find((p) => p.slug === slug);
      setPost(found || null);
    });
  }, [slug]);

  if (!post) return <div className="p-8 text-center">載入中或文章不存在...</div>;

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 prose prose-lg">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
    </div>
  );
};

export default PostDetailPage;