/** @type {import('next').NextConfig} */
const nextConfig = {
  // Aapki existing settings
  reactCompiler: true,
  transpilePackages: ['@indi-com/ui'],

  // Naya addition: Headers for Security
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' http://localhost:3033 http://192.168.1.202:3033;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;