/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dicedb.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
