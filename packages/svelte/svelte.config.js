import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),
  kit: {
    package: {
      dir: 'dist',
      emitTypes: true,
      exports: (fp) => fp === 'index.ts'
    }
  }
}

export default config
