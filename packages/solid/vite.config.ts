import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
import solid from 'vite-plugin-solid'
import tsConfigPaths from 'vite-tsconfig-paths'
import { author, homepage, license, name, version } from './package.json'

const workdir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    solid(),
    dts({ insertTypesEntry: true }),
    tsConfigPaths(),
    banner(
      `/**\n * name: ${name}` +
        `\n * version: ${version}` +
        `\n * author: ${author.name} (${author.url})` +
        `\n * homepage: ${homepage}` +
        `\n * license ${license}\n */`
    )],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    lib: {
      entry: resolve(workdir, 'src/index.tsx'),
      name: 'Fireworks',
      formats: [
        'es',
        'cjs',
        'umd'
      ],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['solid-js', 'fireworks-js'],
      output: {
        exports: 'named',
        globals: {
          'solid-js': 'Solid',
          'fireworks-js': 'Fireworks'
        }
      }
    }
  }
})
