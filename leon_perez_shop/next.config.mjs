/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "media.boohoo.com",
      },
    ],
  },
};

export default nextConfig;
