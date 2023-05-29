<script lang="ts">
  import { Fireworks } from 'fireworks-js'
  import type { FireworksOptions } from 'fireworks-js'

  let className = ''
  export { className as class }
  export let autostart = true
  export let style: string = ''
  export let options: FireworksOptions = {}

  let fireworks: Fireworks

  export function fireworksInstance() {
    return fireworks
  }

  function setup(container:HTMLDivElement, options: FireworksOptions) {
    fireworks = new Fireworks(container, options)
    if (autostart) {
      fireworks.start()
    }
    return {
      update(options: FireworksOptions) {
        fireworks.updateOptions(options)
      },
      destroy() {
        fireworks.stop()
      }
    }
  }
</script>

<div class={className} {style} use:setup={options}>
  <slot></slot>
</div>
