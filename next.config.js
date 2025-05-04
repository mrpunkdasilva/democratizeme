/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['randomuser.me', 'via.placeholder.com'],
  },
  // Configuração para permitir SVG como componentes
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

// Desativa SSR completamente em desenvolvimento
if (process.env.NODE_ENV === 'development') {
  nextConfig.unstable_runtimeJS = true;
  nextConfig.unstable_JsPreload = false;
}

module.exports = nextConfig;