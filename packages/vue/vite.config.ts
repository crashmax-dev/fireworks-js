import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'
import { author, homepage, license, name, version } from './package.json'

export default defineConfig({
  plugins: [
    vue(),
    banner(
      `/**\n * name: ${name}` +
        `\n * version: ${version}` +
        `\n * author: ${author.name} (${author.url})` +
        `\n * homepage: ${homepage}` +
        `\n * license ${license}\n */`
    )
  ],
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Fireworks',
      formats: [
        'es',
        'cjs',
        'umd'
      ],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'fireworks-js'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'fireworks-js': 'Fireworks'
        }
      }
    }
  }
})
