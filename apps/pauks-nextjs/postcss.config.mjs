import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dev = process.env.NODE_ENV !== 'production';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const stylexDependencies = ['@proot/components', '@proot/tokens', '@stylexjs/open-props'];

export default {
  plugins: {
    '@stylexjs/postcss-plugin': {
      include: [
        './src/**/*.{ts,tsx,css}',
        // Local monorepo packages
        ...stylexDependencies.map((dep) => resolve(__dirname, `node_modules/${dep}/**/*.{js,jsx,ts,tsx}`)),
      ],
      babelConfig: {
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
      useCSSLayers: false,
    },
  },
};
