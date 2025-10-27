import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../lib/getPosts';
import { useNavigate } from 'react-router-dom';

const BlogIndex = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPosts().then((posts) => {
        console.log('🪵 BlogIndex loaded posts:', posts);
        setPosts(posts);
    });
    }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-serif text-center mb-12 border-b pb-4">
        所有文章
      </h1>
      {posts.map((post) => (
        <div
            key={post.slug}
            className="mb-12 p-6 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/posts/${post.slug}`)}
        >
            {/* 🏷️ 分類標籤 */}
            <div className="mb-2">
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-700">
                {post.category}
            </span>
            </div>

            <h2 className="text-2xl font-serif text-[#333333] mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{post.date}</p>
            <div
                className="text-gray-700 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: post.content }}
                />
        </div>
        ))}
    </div>
  );
};

export default BlogIndex;