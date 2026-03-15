import { BookOpen } from 'lucide-react';
import { getPostsByCollection } from '../../lib/posts';
import SalonListClient from '../../components/SalonListClient';

export const metadata = {
  title: '文學日常',
  description: '新詩、散文與生活記敘。',
};

export default async function SalonPage() {
  const posts = await getPostsByCollection('Life');

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#333333] text-center mb-8 md:mb-12 border-b pb-3 tracking-wide md:tracking-wider leading-snug">
          <BookOpen className="inline-block w-8 h-8 mr-3 text-amber-600" />
          文學日常
        </h2>

        {posts.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-600">目前還沒有文章。</div>
        ) : (
          <SalonListClient posts={posts} />
        )}
      </div>
    </div>
  );
}

