import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import vue from '@vitejs/plugin-vue'

const workdir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    dts({ insertTypesEntry: true }),
    tsConfigPaths()
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
    },
    rollupOptions: {
      external: [
        'vue',
        'fireworks-js',
        '@fireworks-js/helpers'
      ],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          'fireworks-js': 'Fireworks',
          '@fireworks-js/helpers': 'FireworksHelper'
        }
      }
    }
  }
})
