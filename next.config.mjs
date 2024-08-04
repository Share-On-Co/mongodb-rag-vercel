import CopyWebpackPlugin from 'copy-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/api/**/*': ['./node_modules/**/*.wasm'],
    },
  },
  webpack: (config) => {
    // Ignore node-specific modules when bundling for the browser
    config.resolve.alias = {
      ...config.resolve.alias,
      "sharp$": false,
      "onnxruntime-node$": false,
    };

    // Add CopyWebpackPlugin to handle .wasm files
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: "node_modules/tiktoken/lite/tiktoken_bg.wasm",
              to: "public/tiktoken_bg.wasm", // or your desired location
              toType: "file",
            },
          ],
        })
      );

    return config;
  },
};

export default nextConfig;
