import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const libraries = ['@proot/components', '@proot/tokens'];

// https://astro.build/config
export default defineConfig({
  vite: {
    optimizeDeps: {
      exclude: libraries,
    },
    ssr: {
      optimizeDeps: {
        exclude: libraries,
      },
      noExternal: libraries,
    },
    css: {
      transformer: 'postcss',
      postcss: resolve(resolve(), 'postcss.config.mjs'),
    },
  },
  integrations: [
    react({
      babel: {
        babelrc: false,
        plugins: [
          [
            '@stylexjs/babel-plugin',
            {
              dev: process.env.NODE_ENV !== 'production',
              test: process.env.NODE_ENV === 'test',
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
    }),
  ],
});
