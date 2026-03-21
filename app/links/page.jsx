import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Mail, Github } from 'lucide-react';

export const metadata = {
  title: 'Links',
  description: '斑泥 Bānní 的導流頁面：文字日常、遊記攝影、經濟討論與合作諮詢入口。',
};

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 mb-4 relative">
            <Image src="/site_logo.svg" alt="斑泥走走 Logo" fill className="object-contain" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-amber-800 tracking-wide">
            斑泥 Bānní
          </h1>
          <p className="mt-2 text-sm text-gray-600 leading-snug">
            漫步在理性和感性的邊界。
            <br />
            TSE 經濟研究生／自由撰稿人。
          </p>
        </div>

        {/* Main link buttons */}
        <div className="space-y-3">
          <Link
            href="/salon"
            className="block w-full rounded-full border border-amber-700 text-amber-800 bg-white px-5 py-3 text-sm font-medium text-center hover:bg-amber-700 hover:text-white transition"
          >
            📝 文字日常
          </Link>

          <Link
            href="/travel"
            className="block w-full rounded-full border border-amber-700 text-amber-800 bg-white px-5 py-3 text-sm font-medium text-center hover:bg-amber-700 hover:text-white transition"
          >
            📸 遊記攝影
          </Link>

          <Link
            href="/discussion"
            className="block w-full rounded-full border border-amber-700 text-amber-800 bg-white px-5 py-3 text-sm font-medium text-center hover:bg-amber-700 hover:text-white transition"
          >
            📊 經濟討論
          </Link>

          <Link
            href="/collaboration"
            className="block w-full rounded-full bg-amber-700 text-white px-5 py-3 text-sm font-semibold text-center hover:bg-amber-800 transition shadow-sm"
          >
            🤝 合作諮詢與留學顧問
          </Link>
        </div>

        {/* Support button */}
        <div className="mt-5">
          <a
            href="https://www.buymeacoffee.com/banni.walks"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-full bg-amber-50 border border-amber-200 text-amber-800 px-5 py-3 text-sm font-medium text-center hover:bg-amber-100 transition"
          >
            ☕ 贊助我一杯咖啡
          </a>
        </div>

        {/* Social icons */}
        <div className="mt-6 flex items-center justify-center gap-5 text-gray-500">
          <a
            href="https://www.instagram.com/banni_walks"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-amber-700 transition"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="mailto:br910624@gmail.com"
            aria-label="Email"
            className="hover:text-amber-700 transition"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-amber-700 transition"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

