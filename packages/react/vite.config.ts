import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
import { author, homepage, license, name, version } from './package.json'

export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'classic' }),
    dts({ insertTypesEntry: true }),
    banner(
      `/**\n * name: ${name}` +
        `\n * version: ${version}` +
        `\n * author: ${author.name} (${author.url})` +
        `\n * homepage: ${homepage}` +
        `\n * license ${license}\n */`
    )],
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'Fireworks',
      formats: [
        'es',
        'cjs',
        'umd'
      ],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'fireworks-js'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'fireworks-js': 'Fireworks'
        }
      }
    }
  }
})
