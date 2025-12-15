/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  
  // Skip ESLint and TypeScript during build (run separately)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'prism-react-renderer'],
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
