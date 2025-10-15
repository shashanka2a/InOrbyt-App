/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  webpack: (config) => {
    // Silence optional RN dependency pulled by MetaMask SDK in some bundles
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@react-native-async-storage/async-storage': false,
    };
    return config;
  },
  eslint: {
    // Avoid blocking production builds on lint errors during migration
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Avoid blocking production builds on type errors during migration
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
