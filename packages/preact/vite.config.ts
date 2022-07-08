import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import preact from '@preact/preset-vite'
import { author, homepage, license, name, version } from './package.json'

const workdir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    preact(),
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
      external: [
        'preact/compat',
        'preact/hooks',
        'fireworks-js'
      ],
      output: {
        exports: 'named',
        globals: {
          'preact/compat': 'PreactCompat',
          'preact/hooks': 'PreactHooks',
          'fireworks-js': 'Fireworks'
        }
      }
    }
  }
})
