# @fireworks-js/svelte

> https://github.com/crashmax-dev/fireworks-js

## Installation

```sh
npm install @fireworks-js/svelte
```

## Usage

#### [`fireworks-js`](https://github.com/crashmax-dev/fireworks-js/tree/master/examples/with-svelte)

```svelte
<script lang="ts">
  import { Fireworks } from '@fireworks-js/svelte'
  import type { FireworksOptions } from '@fireworks-js/svelte'

  let fw: Fireworks
  let options: FireworksOptions = {
    opacity: 0.5
  }

  function toggleFireworks() {
    const fireworks = fw.fireworksInstance()
    if (fireworks.isRunning) {
      fireworks.waitStop()
    } else {
      fireworks.start()
    }
  }
</script>
<Fireworks bind:this={fw} autostart={false} {options} class="fireworks" />
```
