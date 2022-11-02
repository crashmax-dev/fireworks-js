<script lang="ts" setup>
import { Fireworks } from 'fireworks-js'
import type { FireworksOptions } from 'fireworks-js'
import { PropType, defineExpose, onMounted, onUnmounted, ref } from 'vue'

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

const fireworks = ref<Fireworks>()
const container = ref<HTMLDivElement>()

onMounted(() => {
  fireworks.value = new Fireworks(container.value!, props.options)
  if (props.autostart) {
    fireworks.value.start()
  }
})

onUnmounted(() => {
  fireworks.value!.stop()
})

defineExpose({
  fireworks,
  container
})
</script>

<template>
  <div ref="container"></div>
</template>
