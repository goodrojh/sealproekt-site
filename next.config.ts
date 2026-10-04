import type { NextConfig } from "next";

// На GitHub Pages сайт живёт в подпапке /<repo>. Для своего домена BASE_PATH оставить пустым.
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
