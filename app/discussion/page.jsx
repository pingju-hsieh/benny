import { Lamp } from 'lucide-react';
import { getPostsByCollection } from '../../lib/posts';
import DiscussionListClient from '../../components/DiscussionListClient';

export const metadata = {
  title: '經濟討論',
  description: '以文章形式撰寫的經濟與市場思辨（Markdown）。',
};

export default async function DiscussionPage() {
  const posts = await getPostsByCollection('Discussion');

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-serif text-[#333333] text-center mb-12 border-b pb-4 tracking-wider">
          <Lamp className="inline-block w-8 h-8 mr-3 text-green-600" />
          經濟討論
        </h2>

        <div className="mb-12 border-l-4 border-amber-600 pl-6 py-2">
  <p className="font-serif text-lg md:text-xl text-stone-700 leading-relaxed">
    「市場經濟並非目的本身，而是一種工具；如同所有的工具，它需要被妥善地引導，以服務於社會的共善（Common Good）。」
  </p>
  <p className="mt-4 text-sm text-stone-500 font-medium">
    —— Jean Tirole, <span className="italic">《邁向共善》（Economics for the Common Good）</span>
  </p>
</div>

<p className="font-serif text-base md:text-lg text-stone-600 leading-loose whitespace-pre-line">
  自由與管制的交界在哪裡？我試著紀錄對全球產業組織（Industrial Organization）、監管政策與制度的宏觀觀察。
</p>

        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-600">目前還沒有文章。請新增到 `content/Discussion/`。</div>
        ) : (
          <DiscussionListClient posts={posts} />
        )}
      </div>
    </div>
  );
}

