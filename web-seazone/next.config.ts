import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    domains: [
      process.env.NEXT_PUBLIC_IMAGE_HOSTNAME ||
        "picsum.photos",
    ],
  },
};

export default nextConfig;
