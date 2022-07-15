<template>
  <button
    @click="enabled = !enabled"
    :style="{ position: 'absolute', zIndex: 1 }"
  >
    {{ enabled ? 'Enabled' : 'Disabled' }}
  </button>
  <Fireworks
    v-if="enabled"
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
import { ref } from 'vue'
import { Fireworks } from '@fireworks-js/vue'
import type { FireworksOptions } from '@fireworks-js/vue'

const options = ref<FireworksOptions>({ opacity: 0.5 })
const enabled = ref(true)
</script>
