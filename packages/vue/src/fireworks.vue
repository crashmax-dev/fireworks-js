<template>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import { Fireworks } from 'fireworks-js'
import type { FireworksOptions } from 'fireworks-js'
import { defineProps, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{ options?: FireworksOptions }>()
const fireworks = ref<Fireworks>()
const container = ref()

onMounted(() => {
  fireworks.value = new Fireworks(container.value!, props.options)
  fireworks.value.start()
})

onUnmounted(() => {
  fireworks.value!.stop()
})
</script>
