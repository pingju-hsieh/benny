import './globals.css';
import Script from 'next/script';
import { Noto_Serif_TC } from 'next/font/google';
import SiteLayout from '../components/SiteLayout';
import BuyMeACoffeeWidget from '../components/BuyMeACoffeeWidget';

const SITE_NAME = '斑泥走走';
const SITE_DESC = '文學、旅行攝影與經濟思辨的個人創作網站。';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://banni-walks.com'),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  icons: {
    icon: '/site_logo.svg',
    shortcut: '/site_logo.svg',
    apple: '/site_logo.svg',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const serif = Noto_Serif_TC({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-noto-serif-tc',
  preload: false,
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant" className={serif.variable}>
      <head>
        {/* 1. Netlify Identity */}
        <Script 
          src="https://identity.netlify.com/v1/netlify-identity-widget.js" 
          strategy="beforeInteractive" 
        />

        {/* 2. Google AdSense */}
        <Script
          id="adsense-init"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6527096544264566"
          crossOrigin="anonymous"
        />
      </head>
      
      <body className="min-h-screen text-[#333333] font-sans antialiased bg-gray-50">
        {/* 3. Google Analytics 4 (GA4) - 直接寫入 ID 版本 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FTSYMFWHVC"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FTSYMFWHVC', { anonymize_ip: true });
          `}
        </Script>

        <SiteLayout>{children}</SiteLayout>
        <BuyMeACoffeeWidget />
      </body>
    </html>
  );
}