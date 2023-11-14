const plugins = [];
if (process.env.ANALYZE === "true") {
  // only load dependency if env `ANALYZE` was set
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  });
  plugins.push(withBundleAnalyzer);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    productionBrowserSourceMaps: false,
    transpilePackages: ['lucide-react'],
    typescript: {
      ignoreBuildErrors: !!process.env.CI,
    },
    eslint: {
      ignoreDuringBuilds: !!process.env.CI,
    },
    modularizeImports: {
      "ui/components/icon": {
        transform: "lucide-react/dist/esm/icons/{{ kebabCase member }}",
        preventFullImport: true,
      }
    },
    async redirects() {
        return [
          {
            source: '/',
            destination: '/dashboard',
            permanent: true,
          },
        ]
    }
}

export default nextConfig
