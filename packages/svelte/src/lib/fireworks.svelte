<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { Fireworks } from 'fireworks-js'
  import type { FireworksOptions } from 'fireworks-js'

  let className = ''
  export { className as class }
  export let style: string = ''
  export let options: FireworksOptions = {}

  let container: HTMLDivElement
  let fireworks: Fireworks

  onMount(() => {
    fireworks = new Fireworks(container, options)
    fireworks.start()
  })

  onDestroy(() => {
    fireworks?.stop()
  })
</script>

<div bind:this={container} class={className} {style}>
  <slot></slot>
</div>
