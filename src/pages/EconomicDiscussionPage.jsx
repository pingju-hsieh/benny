import React from 'react';
import { Lamp } from 'lucide-react';

const EconomicDiscussionPage = () => (
  <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-5xl font-serif text-[#333333] text-center mb-12 border-b pb-4 tracking-wider">
        <Lamp className="inline-block w-8 h-8 mr-3 text-green-600" />
        經濟討論
      </h2>
      <div className="space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <p className="text-xl font-serif text-gray-800 border-b pb-4">
          巨觀視角下的市場脈動與個人財富思辨。
        </p>
        <p className="text-gray-700 leading-relaxed">
          本區塊專注於對全球經濟趨勢、金融市場結構變革以及投資哲學的深入討論。我們不提供投資建議，只提供理性分析與跨領域思維的碰撞。
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 pl-4">
          <li>宏觀經濟學的邊界與挑戰</li>
          <li>技術進步對勞動力市場的長期影響</li>
          <li>亞洲新興市場的投資潛力分析</li>
        </ul>
      </div>
    </div>
  </div>
);

export default EconomicDiscussionPage;