import { resolve } from 'node:path';
import stylex from '@stylexjs/postcss-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

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

export default defineConfig({
  ssr: {
    noExternal: stylexDependencies,
  },
  plugins: [
    react(),
    babel({
      babelConfig,
      loader: 'jsx',
      filter: /\.[jt]sx?$/u,
    }),
  ],
  css: {
    transformer: 'postcss',
    postcss: {
      plugins: [
        stylex({
          babelConfig,
          useCSSLayers: false,
          include: [
            './src/**/*.{ts,tsx,astro}',
            ...stylexDependencies.map((dep) => resolve(__dirname, `./node_modules/${dep}/**/*.{js,jsx,ts,tsx}`)),
          ],
        }),
      ],
    },
  },
});
