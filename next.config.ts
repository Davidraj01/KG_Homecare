import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All images are local (in /public), no remote domains needed
    unoptimized: false,
  },
  async redirects() {
    return [
      // SEO page slugs that were renamed after being indexed by Google —
      // add an entry here whenever a published slug changes, so old
      // search-result/bookmark links don't 404.
      {
        source: "/samsung-washing-service-centre-in-thoothukudi",
        destination: "/samsung-washing-machine-service-centre-in-thoothukudi",
        permanent: true,
      },
      // Indexed/shared URL with no matching published SEO page — send it to
      // the closest live equivalent (the Thoothukudi service hub) instead of 404.
      {
        source: "/washing-machine-service-centre-in-thoothukudi",
        destination: "/thoothukudi",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
