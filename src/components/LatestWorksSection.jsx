import React from 'react';
import { Clock, BookOpen, Camera, Lamp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LatestWorksSection = React.memo(() => {
  const navigate = useNavigate();

  const featuredWorks = [
    {
      title: '時間的灰燼：論現代主義的消亡',
      category: '文學沙龍',
      subCategory: '新詩',
      date: '2025-10-25',
      preview: '在現代主義的廢墟中，我們尋找新的光芒。這是一場關於時間與記憶的詩意探索...',
      view: 'salon',
      colorClass: 'text-amber-700 border-amber-700 bg-amber-100',
      hoverBorderClass: 'hover:border-amber-500'
    },
    {
      title: '追逐極光：冰島的零度旅行筆記',
      category: '旅遊攝影',
      subCategory: '冰島',
      date: '2025-10-22',
      preview: '冰島的夜晚，極光如夢幻般舞動，每一幀都是大自然最動人的傑作...',
      view: 'photography',
      colorClass: 'text-blue-700 border-blue-700 bg-blue-100',
      hoverBorderClass: 'hover:border-blue-500'
    },
    {
      title: '通脹螺旋與軟著陸：央行博弈論',
      category: '經濟討論',
      subCategory: '宏觀',
      date: '2025-10-18',
      preview: '深入解析全球央行在通脹與衰退之間的微妙平衡，以及其政策對市場的潛在影響。',
      view: 'economic',
      colorClass: 'text-green-700 border-green-700 bg-green-100',
      hoverBorderClass: 'hover:border-green-500'
    },
  ];

  return (
    <div className="py-16 border-t border-gray-200">
      <div className="text-center">
        <h3 className="text-4xl font-serif text-center text-[#333333] mb-12 border-b-2 border-amber-500 pb-3 inline-block mx-auto">
          最新作品
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {featuredWorks.map((work, index) => (
          <div
            key={index}
            className={`p-6 min-h-[420px] bg-white rounded-lg shadow-xl transition duration-300 hover:shadow-2xl hover:-translate-y-2 transform border-t-4 border-b-4 border-transparent ${work.hoverBorderClass} flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className={`inline-block text-xs font-semibold py-1 px-3 rounded-full uppercase ${work.colorClass}`}>
                  {work.category}
                </span>
                {work.subCategory && (
                  <span className="inline-block text-xs font-medium py-1 px-3 rounded-full bg-gray-100 text-gray-600">
                    {work.subCategory}
                  </span>
                )}
              </div>

              <h4
                className="text-xl font-semibold text-gray-800 mt-3 hover:text-gray-900 cursor-pointer transition"
                onClick={() => navigate(`/${work.view}`)}
              >
                {work.title}
              </h4>

              <p className="text-sm text-gray-500 mt-2">
                <Clock className="w-3 h-3 inline mr-1" />
                {work.date}
              </p>

              {work.preview && (
                <p className="text-gray-600 text-base mt-3 leading-relaxed line-clamp-3">
                  {work.preview}
                </p>
              )}
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => navigate(`/${work.view}`)}
                className={`text-sm font-medium ${work.colorClass
                  .split(' ')
                  .filter(c => !c.startsWith('bg-'))
                  .join(' ')} border px-4 py-1 rounded-full hover:opacity-80 transition duration-300`}
              >
                查看「{work.category}」
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default LatestWorksSection;