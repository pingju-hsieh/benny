import Image from 'next/image';
import { BookOpen, Camera, Lamp, Mail } from 'lucide-react';

export const metadata = {
  title: '關於',
  description: '關於斑泥：文字、旅行與經濟思辨。',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-24 px-6 sm:px-10 lg:px-20 text-[#333333]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-wide leading-snug mb-8 md:mb-12 text-center border-b pb-4">
          斑泥 Bānní
        </h1>

        <p className="text-xl leading-relaxed mb-8 indent-8">我在稻田與水圳邊上長大，走過城市邊陲與山脈之間</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative w-full h-[420px]">
            <Image
              src="/photo/banni.jpg"
              alt="Banni portrait"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-2xl shadow-lg object-cover"
              priority
            />
          </div>

          <div className="text-lg space-y-4">
            <p>
              一個熱愛文字與旅行的靈魂，喜歡凝視風景，也嘗試把凝視寫下。
            </p>
            <p>
              經濟是我的職志，願它能造就平凡的日常。詩是安靜的呼吸。我嘗試將理性與感性、分析與感受，編織成一段段文字與影像。
            </p>
          </div>
        </div>

        <div className="mt-16 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold tracking-wide leading-snug">
            筆名
          </h2>
          <div className="text-lg space-y-4">
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
              <li>
                <strong>「斑</strong> 斕」 是我渴望的光——希望文字有顏色、有光影，願意讓人停下來多看一眼。
              </li>
              <li>
                「<strong>泥</strong>」 是我曾經害怕被看見的東西：不完整、鬆軟、不確定。但我學著用它塑形，慢慢捏出屬於自己的樣子。
              </li>
            </ul>
            <p>如果你讀到了什麼，也許那正是我們心裡共有的碎片。我願這些碎片被你收藏，能再折射出五彩斑斕的光。</p>
          </div>
        </div>

        <div className="mt-16 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold tracking-wide leading-snug">
            目前的行走
          </h2>
          <div className="text-lg space-y-4">
            <p>
              目前在法國圖盧茲經濟學院 (TSE) 攻讀應用數學與經濟決策碩士。
            </p>
            <p>
              在研究產業組織 (IO) 與市場規管的空檔，我正以緩慢的步調編寫第一本詩集，主題圍繞著信、望、愛 —— 從山與城市，到社會裂縫，再到記憶中的某次擁抱，願這些文字也能為讀者留下微小的光。
            </p>
          </div>
        </div>

        <div className="mt-16 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold tracking-wide leading-snug">
            關注的主題
          </h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li className="flex items-center">
              <Lamp className="w-5 h-5 mr-2 text-green-600" />
              經濟與思辨 — 理解世界運作的邏輯、機制設計與倫理
            </li>
            <li className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-amber-600" />
              文學與詩 — 人性的光影與語言的溫度
            </li>
            <li className="flex items-center">
              <Camera className="w-5 h-5 mr-2 text-blue-500" />
              攝影與旅行 — 凝視世界、記錄靜謐與瞬間
            </li>
          </ul>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold tracking-wide leading-snug mb-4">
            聯絡我
          </h2>
          <div className="text-gray-700 text-lg">
            <p className="flex items-center">
              <Mail className="w-5 h-5 mr-2 text-gray-500" />
              IG：@banni_walks｜Email：br910624@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

