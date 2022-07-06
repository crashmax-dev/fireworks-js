import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import { author, homepage, license, name, version } from './package.json'

const workdir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true }),
    tsConfigPaths(),
    banner(
      `/**\n * name: ${name}` +
        `\n * version: ${version}` +
        `\n * author: ${author.name} (${author.url})` +
        `\n * homepage: ${homepage}` +
        `\n * license ${license}\n */`
    )],
  define: {
    version: JSON.stringify(version)
  },
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
        'react',
        'fireworks-js',
        '@fireworks-js/helpers'
      ],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'fireworks-js': 'Fireworks',
          '@fireworks-js/helpers': 'FireworksHelpers'
        }
      }
    }
  }
})
