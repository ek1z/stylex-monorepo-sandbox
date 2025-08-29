import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  plugins: {
    '@stylexjs/postcss-plugin': {
      include: [
        'src/**/*.{ts,tsx,astro}',
        '../../packages/components/dist/**/*.{js,jsx}',
        '../../packages/tokens/dist/**/*.{js,jsx}',
        '../../node_modules/.pnpm/@stylexjs+open-props@0.11.1/node_modules/@stylexjs/open-props/**/*.{js,mjs,jsx}',
      ],
      exclude: ['src/modules/**/build/**/*'],
      useCSSLayers: false,
      babelConfig: {
        babelrc: false,
        parserOpts: {
          plugins: ['typescript', 'jsx'],
        },
        plugins: [
          [
            '@stylexjs/babel-plugin',
            {
              dev: process.env.NODE_ENV !== 'production',
              runtimeInjection: process.env.NODE_ENV !== 'production',
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
  },
};
