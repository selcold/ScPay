import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/" // Currently you need to set the `baseUrl` yourself
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*scratch.mit.edu",
      },
      {
        protocol: "https",
        hostname: "*imgur.com",
      },
      {
        protocol: "https",
        hostname: "mdkaklgrmlyeimwojmph.supabase.co",
      },
    ],
  },
};

export default withNextIntl(nextConfig);