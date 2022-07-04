import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import { version } from './package.json'

const workdir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [dts({ insertTypesEntry: true }), tsConfigPaths()],
  define: {
    version: JSON.stringify(version)
  },
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
    },
    rollupOptions: {
      external: ['@fireworks-js/helpers'],
      output: {
        globals: {
          '@fireworks-js/helpers': 'FireworksHelpers'
        }
      }
    }
  }
})
