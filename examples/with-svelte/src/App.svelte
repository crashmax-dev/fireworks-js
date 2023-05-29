<script lang="ts">
  import { Fireworks } from '@fireworks-js/svelte'
  import type { FireworksOptions } from '@fireworks-js/svelte'
  import { onMount } from 'svelte'

  let fw: Fireworks
  let mounted = true
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

  onMount(() => {
    const fireworks = fw.fireworksInstance()
    console.log(fireworks)
  })
</script>

<main>
  <div class="buttons">
    <button on:click={() => (mounted = !mounted)}>
      {mounted ? 'Mounted' : 'Unmounted'}
    </button>
  </div>
  {#if mounted}
    <Fireworks
      bind:this={fw}
      {options}
      class="fireworks"
    />
  {/if}
</main>

<style>
  :global(.fireworks) {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background: #000;
  }

  .buttons {
    display: flex;
    gap: 4px;
    position: absolute;
    z-index: 1;
  }
</style>
