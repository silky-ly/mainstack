/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['lucide-react'],
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
