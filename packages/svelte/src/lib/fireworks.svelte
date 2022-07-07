<div bind:this={container}></div>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { Fireworks } from 'fireworks-js'
  import type { FireworksOptions } from 'fireworks-js'

  export let options: FireworksOptions
  let container: HTMLDivElement
  let fireworks: Fireworks

  onMount(() => {
    fireworks = new Fireworks(container, options)
    fireworks.start()
  })

  onDestroy(() => {
    fireworks.stop()
  })
</script>
