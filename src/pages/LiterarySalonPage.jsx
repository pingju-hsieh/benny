import React from 'react';
import { BookOpen, Clock } from 'lucide-react';

const BG_COLOR = 'bg-gray-50';

const LiterarySalonPage = () => (
  <div className={`min-h-screen ${BG_COLOR} py-24 px-4 sm:px-6 lg:px-8`}>
    <div className="max-w-4xl mx-auto">
      <h2 className="text-5xl font-serif text-[#333333] text-center mb-12 border-b pb-4 tracking-wider">
        <BookOpen className="inline-block w-8 h-8 mr-3 text-amber-600" />
        文學沙龍
      </h2>

      <div className="space-y-12">
        {/* 新詩 */}
        <div className="p-6 rounded-xl bg-white shadow-lg transition duration-300 hover:shadow-xl hover:scale-[1.02]">
          <h3 className="text-3xl font-serif text-gray-800 mb-3 border-l-4 border-amber-500 pl-3">
            【新詩】午後的靜默
          </h3>
          <p className="text-sm text-gray-500 mb-4 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            發表於 2025/10/26
          </p>
          <p className="text-gray-700 leading-relaxed indent-8">
            陽光穿過百葉窗，在木地板上切割出黃金的幾何。時間像一隻懶散的貓，蜷縮在書頁的邊緣，不願挪動。
            我在這片靜默裡，撿拾破碎的靈感，將其縫合成詩。
            沙龍的午後，只剩下筆尖與紙張的輕微摩擦聲，那便是世界最溫柔的絮語。
          </p>
          <a href="#" className="mt-4 inline-block text-amber-600 hover:text-amber-800 transition duration-300 font-medium">
            閱讀全文...
          </a>
        </div>

        {/* 散文 */}
        <div className="p-6 rounded-xl bg-white shadow-lg transition duration-300 hover:shadow-xl hover:scale-[1.02]">
          <h3 className="text-3xl font-serif text-gray-800 mb-3 border-l-4 border-amber-500 pl-3">
            【散文】城市裡的孤島咖啡館
          </h3>
          <p className="text-sm text-gray-500 mb-4 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            發表於 2025/10/20
          </p>
          <p className="text-gray-700 leading-relaxed indent-8">
            每個城市都有一個能讓你暫時逃離喧囂的角落，我的孤島，是一間永遠播放著爵士樂的老咖啡館。
            在這裡，文字的浪潮不會淹沒你，只會輕輕拍打著心靈的海岸線。
            一杯黑咖啡，足夠抵擋世間所有的紛擾。
          </p>
          <a href="#" className="mt-4 inline-block text-amber-600 hover:text-amber-800 transition duration-300 font-medium">
            閱讀全文...
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default LiterarySalonPage;