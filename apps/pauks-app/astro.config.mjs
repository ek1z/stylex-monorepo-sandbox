import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import stylex from '@stylexjs/postcss-plugin';
import { defineConfig } from 'astro/config';
import babel from 'vite-plugin-babel';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const stylexDependencies = ['@proot/components', '@proot/tokens', '@stylexjs/open-props'];

const babelConfig = {
  babelrc: false,
  configFile: false,
  presets: ['@babel/preset-typescript'],
  plugins: [
    [
      '@stylexjs/babel-plugin',
      {
        dev: process.env.NODE_ENV !== 'production',
        test: process.env.NODE_ENV === 'test',
        runtimeInjection: process.env.NODE_ENV !== 'production',
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
};

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      // Make sure to make Vite apply the babel transformation also in SSR
      noExternal: stylexDependencies,
    },
    css: {
      transformer: 'postcss',
      postcss: {
        plugins: [
          stylex({
            babelConfig,
            useCSSLayers: false,
            include: [
              './src/**/*.{ts,tsx,astro}',
              // Local monorepo packages
              ...stylexDependencies.map((dep) => resolve(__dirname, `node_modules/${dep}/**/*.{js,jsx,ts,tsx}`)),
            ],
          }),
        ],
      },
    },
    plugins: [
      babel({
        babelConfig,
        loader: 'jsx',
        filter: /\.[jt]sx?$/u,
      }),
    ],
  },
  integrations: [react()],
});
