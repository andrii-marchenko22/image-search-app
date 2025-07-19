import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => ({
  define: {
    [command === 'serve' ? 'global' : '_global']: {},
  },
  root: 'src',
  base: '/',
  build: {
    outDir: '../dist',
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    injectHTML(),
    FullReload(['./src/**/**.html']),
    SortCss({
      sort: 'mobile-first',
    }),
  ],
}));
