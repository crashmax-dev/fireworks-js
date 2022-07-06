<template>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import { Fireworks } from 'fireworks-js'
import type { FireworksOptions } from 'fireworks-js'
import { defineProps, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{ options: FireworksOptions }>()
const fireworks = ref<Fireworks>()
const container = ref(null)

onMounted(() => {
  fireworks.value = new Fireworks(container.value!, props.options)
  fireworks.value.start()
})

onUnmounted(() => {
  fireworks.value!.stop()
})
</script>

<style>
div {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background: #000;
}
</style>
