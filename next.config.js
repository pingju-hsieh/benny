/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    const videoHeaders = [
      { key: 'Accept-Ranges', value: 'bytes' },
      { key: 'Vary', value: 'Range' },
      { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
      { key: 'Netlify-Vary', value: 'header=range' },
      { key: 'Netlify-CDN-Cache-Control', value: 'public, max-age=0, must-revalidate, durable' },
    ];
    return [
      { source: '/content/:path*.mp4', headers: videoHeaders },
      { source: '/content/:path*.mov', headers: videoHeaders },
      { source: '/content/:path*.webm', headers: videoHeaders },
    ];
  },
};

export default nextConfig;

