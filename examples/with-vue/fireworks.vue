<template>
  <Fireworks
    :options="{ mouse: { click: true } }"
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

<script setup>
import { Fireworks } from '@fireworks-js/vue'
</script>
