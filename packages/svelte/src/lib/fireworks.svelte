<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { Fireworks } from 'fireworks-js'
  import type { FireworksOptions } from 'fireworks-js'

  let className = ''
  export { className as class }
  export let autostart = true
  export let style: string = ''
  export let options: FireworksOptions = {}

  let container: HTMLDivElement
  let fireworks: Fireworks

  export function fireworksInstance() {
    return fireworks
  }

  onMount(() => {
    fireworks = new Fireworks(container, options)
    if (autostart) {
      fireworks.start()
    }
  })

  onDestroy(() => {
    fireworks?.stop()
  })
</script>

<div bind:this={container} class={className} {style}>
  <slot></slot>
</div>
