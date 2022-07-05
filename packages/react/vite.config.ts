import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import { version } from './package.json'

const workdir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true }),
    tsConfigPaths()
  ],
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
        globals: {
          react: 'React',
          'fireworks-js': 'Fireworks',
          '@fireworks-js/helpers': 'FireworksHelpers'
        }
      }
    }
  }
})
