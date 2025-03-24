/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    // Fix for lodash bundling issues
    config.resolve.alias = {
      ...config.resolve.alias,
      lodash: require.resolve("lodash"),
    };
    return config;
  },
};

if (process.env.NEXT_PUBLIC_TEMPO) {
  nextConfig["experimental"] = {
    // NextJS 13.4.8 up to 14.1.3:
    swcPlugins: [[require.resolve("tempo-devtools/swc/0.86"), {}]],
  };
}

// Use a random port between 3100-3999 to avoid conflicts
const PORT =
  parseInt(process.env.PORT, 10) || 3100 + Math.floor(Math.random() * 900);

// When using output: export, we can't use rewrites, headers, or runtime configs
module.exports = {
  ...nextConfig,
  devIndicators: {
    buildActivity: false,
  },
};
