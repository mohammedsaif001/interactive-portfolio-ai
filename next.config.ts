import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Lets phones and tablets on the same Wi-Fi open the dev server (http://<this-pc-ip>:3000).
  // Without it Next.js blocks dev assets from any hostname other than localhost. Dev only.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  // Bundles only what the server needs into .next/standalone (run with `node server.js`) for a small Azure deploy.
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
