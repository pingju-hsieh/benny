import React from 'react';
import { Camera } from 'lucide-react';

const BG_COLOR = 'bg-gray-50';

const TravelPhotographyPage = () => (
  <div className={`min-h-screen ${BG_COLOR} py-24 px-4 sm:px-6 lg:px-8`}>
    <div className="max-w-6xl mx-auto">
      <h2 className="text-5xl font-serif text-[#333333] text-center mb-12 border-b pb-4 tracking-wider">
        <Camera className="inline-block w-8 h-8 mr-3 text-blue-600" />
        旅遊攝影
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {["冰島峽灣", "京都禪意", "撒哈拉星空", "台東日出", "威尼斯水影"].map((title, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.03] transition duration-300 bg-white"
          >
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-medium">
              {title}
            </div>
            <div className="p-4">
              <h3 className="text-2xl font-serif text-gray-800">{title}</h3>
              <p className="text-sm text-gray-500 mt-2">
                記錄下那片刻的寧靜與永恆。
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TravelPhotographyPage;