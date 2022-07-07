<script lang="ts">
  import { Fireworks } from '@fireworks-js/svelte'
  import type { FireworksOptions } from '@fireworks-js/svelte'

  let enabled = true
  let options: FireworksOptions = {
    opacity: 0.5
  }
</script>

<main>
  <button on:click={() => (enabled = !enabled)} class="btn">
    {enabled ? 'Enabled' : 'Disabled'}
  </button>
  {#if enabled}
    <Fireworks {options} class="fireworks" />
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

  .btn {
    position: absolute;
    z-index: 1;
  }
</style>
