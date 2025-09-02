import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const stylexDependencies = ['@proot/components', '@proot/tokens', '@stylexjs/open-props'];

export default {
  transpilePackages: stylexDependencies,
  eslint: { ignoreDuringBuilds: true },
  webpack: (config, { dev }) => {
    // Process only files that require StyleX compilation using babel-loader
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            parserOpts: {
              plugins: ['typescript', 'jsx'],
            },
            plugins: [
              [
                '@stylexjs/babel-plugin',
                {
                  dev: dev,
                  test: process.env.NODE_ENV === 'test',
                  runtimeInjection: dev,
                  genConditionalClasses: true,
                  treeshakeCompensation: true,
                  aliases: {
                    '@proot/tokens/tokens.stylex': resolve(__dirname, '../../packages/tokens/dist/tokens.stylex.js'),
                  },
                  unstable_moduleResolution: {
                    type: 'commonJS',
                  },
                },
              ],
            ],
          },
        },
      ],
    });

    return config;
  },
};
