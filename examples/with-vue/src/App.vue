<template>
  <div class="buttons">
    <button @click="mounted = !mounted">
      {{ mounted ? 'Mounted' : 'Unmounted' }}
    </button>
    <button @click="startFireworks">Start</button>
  </div>
  <Fireworks
    ref="fw"
    v-if="mounted"
    :autostart="false"
    :options="options"
    :style="{
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      position: 'fixed',
      background: '#000'
    }"
  />
</template>

<script lang="ts" setup>
import { Fireworks } from '@fireworks-js/vue'
import { ref, watch } from 'vue'
import type { FireworksOptions } from '@fireworks-js/vue'

const fw = ref<InstanceType<typeof Fireworks>>()
const options = ref<FireworksOptions>({ opacity: 0.5 })
const mounted = ref(true)

async function startFireworks() {
  if (!fw.value) return
  fw.value.start()
  await new Promise((resolve) => setTimeout(resolve, 1000))
  await fw.value.waitStop()
}

watch(fw, () => startFireworks())
</script>

<style>
body {
  background-color: #000;
}

.buttons {
  z-index: 1;
  position: absolute;
  display: flex;
  gap: 4px;
}
</style>
