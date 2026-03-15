export const dynamic = 'force-static';

export function GET() {
  return Response.redirect(new URL('/salon', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'), 301);
}

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { getPostsByCollection } from '../../lib/posts';

export const metadata = {
  title: '生活日常',
  description: '生活的碎片、日常的光影（Markdown）。',
};

export default async function SentimentPage() {
  const posts = await getPostsByCollection('Sentiment');

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-serif text-[#333333] text-center mb-12 border-b pb-4 tracking-wider">
          <Heart className="inline-block w-8 h-8 mr-3 text-rose-600" />
          生活日常
        </h2>

        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-600">目前還沒有文章。請新增到 `content/Sentiment/`。</div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="block p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {post.category ? (
                    <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-rose-100 text-rose-700">
                      {post.category}
                    </span>
                  ) : null}
                  {(post.dateDisplay || post.date) ? (
                    <span className="text-xs text-gray-500">發表於{post.dateDisplay || post.date}</span>
                  ) : null}
                </div>

                <h3 className="text-2xl font-serif text-[#333333] mb-2">{post.title}</h3>
                {post.info ? <p className="text-gray-600 leading-relaxed">{post.info}</p> : null}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

