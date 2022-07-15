<template>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import { Fireworks } from 'fireworks-js'
import type { FireworksOptions } from 'fireworks-js'
import { PropType, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  options: {
    type: Object as PropType<FireworksOptions>,
    required: false
  }
})

const fireworks = ref<Fireworks>()
const container = ref<HTMLDivElement>()

onMounted(() => {
  fireworks.value = new Fireworks(container.value!, props.options)
  fireworks.value.start()
})

onUnmounted(() => {
  fireworks.value!.stop()
})
</script>
