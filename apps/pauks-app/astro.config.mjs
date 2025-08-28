import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import {dirname, resolve} from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://astro.build/config
export default defineConfig({
  vite: {
    optimizeDeps: {
      exclude: ['@proot/components', '@proot/tokens'],
    },
    ssr: {
      optimizeDeps: {
        exclude: ['@proot/components', '@proot/tokens'],
      },
      noExternal: ['@proot/components', '@proot/tokens']
    },
    css: {
      transformer: 'postcss',
      postcss: resolve(resolve(), 'postcss.config.mjs'),
    }
  },
  // Enable React to support React JSX components.
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
                '@proot/tokens/tokens.stylex': resolve(__dirname, '../../packages/tokens/dist/tokens.stylex.js')
              },
              unstable_moduleResolution: {
                type: 'commonJS'
              }
            }
          ]
        ]
      }
    })
  ],
});
