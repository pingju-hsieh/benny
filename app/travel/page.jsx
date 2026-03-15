import { Camera } from 'lucide-react';
import { getPostsByCollection } from '../../lib/posts';
import TravelListClient from '../../components/TravelListClient';

export const metadata = {
  title: '遊記攝影',
  description: '攝影集與遊記的結合：一組照片、一段路徑、一段文字。',
};

export default async function TravelPage() {
  const posts = await getPostsByCollection('Travel');

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-serif text-[#333333] text-center mb-12 border-b pb-4 tracking-wider">
          <Camera className="inline-block w-8 h-8 mr-3 text-blue-600" />
          遊記攝影
        </h2>

        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-600">
            目前還沒有遊記攝影文章。請新增到 `content/Travel/`。
          </div>
        ) : (
          <TravelListClient posts={posts} />
        )}
      </div>
    </div>
  );
}

