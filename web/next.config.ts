import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Old HTML collection / landing paths → new SSR routes (expand after full old-site crawl)
      {
        source: "/collection.html",
        destination: "/shop/chandeliers",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      // Trailing-slash variants of audience URLs (PDF lists trailing slashes)
      {
        source: "/podcast-studio-lighting-nairobi/",
        destination: "/podcast-studio-lighting-nairobi",
        permanent: true,
      },
      {
        source: "/study-lamps-nairobi/",
        destination: "/study-lamps-nairobi",
        permanent: true,
      },
      {
        source: "/office-lighting-nairobi/",
        destination: "/office-lighting-nairobi",
        permanent: true,
      },
      {
        source: "/hotel-restaurant-lighting-nairobi/",
        destination: "/hotel-restaurant-lighting-nairobi",
        permanent: true,
      },
      {
        source: "/request-a-quote/",
        destination: "/request-a-quote",
        permanent: true,
      },
      {
        source: "/journal/",
        destination: "/journal",
        permanent: true,
      },
      {
        source: "/delivery/nairobi/",
        destination: "/delivery/nairobi",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
