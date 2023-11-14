/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  babel: {
    presets: ["next/babel"],
    plugins: [
      [
        "import",
        {
          libraryName: "antd",
          style: true,
        },
      ],
    ],
  },
};

module.exports = nextConfig;
