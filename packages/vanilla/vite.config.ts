import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import createExternal from 'vite-plugin-external'
import tsConfigPaths from 'vite-tsconfig-paths'

const workdir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    dts({ insertTypesEntry: true }),
    tsConfigPaths(),
    createExternal({
      externals: {
        '@fireworks-js/helpers': 'FireworksHelpers'
      }
    })
  ],
  build: {
    lib: {
      entry: resolve(workdir, 'src/index.ts'),
      name: 'Fireworks',
      formats: [
        'es',
        'cjs',
        'umd'
      ],
      fileName: (format) => `index.${format}.js`
    }
  }
})
