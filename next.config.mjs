import publicRuntimeConfig from "./src/configs/index.js";

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  publicRuntimeConfig,
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/pages/mirrorcrew' : '',
  assetPrefix: isProd ? '/pages/mirrorcrew' : undefined,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/zh-HK': { page: '/', query: { __nextDefaultLocale: 'zh-HK', lang: 'zh-HK' } },
      '/en': { page: '/', query: { __nextDefaultLocale: 'en', lang: 'en' } }
    }
  },
};

export default nextConfig;
