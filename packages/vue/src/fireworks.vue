<script lang="ts" setup>
import { Fireworks } from 'fireworks-js'
import { defineExpose, onMounted, onUnmounted, ref } from 'vue'
import type { FireworksHandlers, FireworksOptions } from 'fireworks-js'
import type { PropType } from 'vue'

const props = defineProps({
  autostart: {
    type: Boolean,
    default: true
  },
  options: {
    type: Object as PropType<FireworksOptions>,
    required: false
  }
})

const container = ref<HTMLDivElement>()
const fireworks = ref<Fireworks>()

onMounted(() => {
  fireworks.value = new Fireworks(container.value!, props.options)
  if (props.autostart) {
    fireworks.value.start()
  }
})

onUnmounted(() => {
  fireworks.value!.stop()
})

defineExpose<FireworksHandlers>({
  get isRunning() {
    return fireworks.value!.isRunning
  },
  get currentOptions() {
    return fireworks.value!.currentOptions
  },
  start() {
    fireworks.value!.start()
  },
  launch(count) {
    fireworks.value!.launch(count)
  },
  stop() {
    fireworks.value!.stop()
  },
  async waitStop() {
    await fireworks.value!.waitStop()
  },
  pause() {
    fireworks.value!.pause()
  },
  clear() {
    fireworks.value!.clear()
  },
  updateOptions(options) {
    fireworks.value!.updateOptions(options)
  },
  updateSize(size) {
    fireworks.value!.updateSize(size)
  },
  updateBoundaries(boundaries) {
    fireworks.value!.updateBoundaries(boundaries)
  }
})
</script>

<template>
  <div ref="container"></div>
</template>
