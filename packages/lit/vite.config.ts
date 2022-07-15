import { resolve } from 'path'
import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import { author, homepage, license, name, version } from './package.json'

export default defineConfig({
  plugins: [
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
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Fireworks',
      formats: ['es'],
      fileName: () => 'index.js'
    },
    rollupOptions: {
      external: /^lit/,
      output: {
        exports: 'named',
        globals: {
          lit: 'Lit'
        }
      }
    }
  }
})
