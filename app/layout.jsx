import './globals.css';
import Script from 'next/script';
import { Noto_Serif_TC } from 'next/font/google';
import SiteLayout from '../components/SiteLayout';

const SITE_NAME = '斑泥走走';
const SITE_DESC = '文學、旅行攝影與經濟思辨的個人創作網站。';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
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
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="zh-Hant" className={serif.variable}>
      <body className="min-h-screen text-[#333333] font-sans antialiased bg-gray-50">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}

        {adsenseClient && (
          <Script
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        )}

        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}

