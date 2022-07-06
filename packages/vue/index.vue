<template>
  <Fireworks :options="options"></Fireworks>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Fireworks from './src/fireworks-js.vue'
import type { FireworksOptions } from './src/index.js'

const options = ref<FireworksOptions>({
  opacity: 0.01
})
</script>
