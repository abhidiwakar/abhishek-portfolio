/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.ytimg.com",
        protocol: "https",
      },
      {
        hostname: "via.placeholder.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
