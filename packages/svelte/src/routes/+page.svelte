<script lang="ts">
  import { Fireworks } from '../lib'
  import type { FireworksOptions } from '../lib'
  import { onMount } from 'svelte'

  let fw: Fireworks
  let enabled = true
  let count = 1
  let options: FireworksOptions = {
    opacity: 0.5
  }

  function launchFireworks() {
    if (enabled) toggleFireworks()
    fw.fireworksInstance().launch(count)
  }

  function toggleFireworks() {
    const fireworks = fw.fireworksInstance()

    enabled = !enabled
    if (enabled) {
      fireworks.start()
    } else {
      fireworks.stop()
    }
  }

  onMount(() => {
    const fireworks = fw.fireworksInstance()
    console.log(fireworks)
  })
</script>

<main>
  <div class="buttons">
    <button on:click={() => toggleFireworks()}>
      {enabled ? 'Stop' : 'Start'}
    </button>
    <button on:click={() => launchFireworks()}>
      Launch
    </button>
    <input
      bind:value={count}
      min="1"
      max="15"
      type="number"
      placeholder="count"
    />
  </div>
  <Fireworks bind:this={fw} autostart={enabled} {options} class="fireworks" />
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
