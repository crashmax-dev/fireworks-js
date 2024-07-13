import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { Fireworks } from 'fireworks-js'
import { Pane } from 'tweakpane'
import {
  backgroundConfig,
  fireworksContainer,
  fireworksOptions,
  mainContainer
} from './config.js'
import type { FpsGraphBladeApi } from '@tweakpane/plugin-essentials/dist/types/fps-graph/api/fps-graph'
import '@r3-dev/brand'

declare global {
  interface Window {
    fireworks: Fireworks
  }
}

const fireworks = new Fireworks(fireworksContainer, fireworksOptions)
window.fireworks = fireworks
fireworks.start()

const fireworksGetters = {
  get traces(): number {
    // @ts-ignore
    return fireworks.traces.length
  },
  get particles(): number {
    // @ts-ignore
    return fireworks.explosions.length
  }
}

const isPcWidth = window.innerWidth > 1000
const tweakpane = new Pane({
  document,
  expanded: isPcWidth,
  title: document.title
})

tweakpane.registerPlugin(EssentialsPlugin)

tweakpane.on('fold', ({ expanded }) => {
  if (isPcWidth) return
  mainContainer.style.display = expanded ? 'none' : 'block'
})

/** options */
tweakpane.addBinding(fireworksOptions, 'hue', {
  min: 0,
  max: 360,
  step: 1
})

tweakpane.addBinding(fireworksOptions, 'acceleration', {
  min: 1,
  max: 2
})

tweakpane.addBinding(fireworksOptions, 'brightness', {
  min: 1,
  max: 100,
  step: 1
})

tweakpane.addBinding(fireworksOptions, 'decay', {
  min: 0.001,
  max: 0.05
})

tweakpane.addBinding(fireworksOptions, 'delay', {
  min: 10,
  max: 100
})

tweakpane.addBinding(fireworksOptions, 'explosion', {
  min: 1,
  max: 10,
  step: 1
})

tweakpane.addBinding(fireworksOptions, 'flickering', {
  min: 0,
  max: 100
})

tweakpane.addBinding(fireworksOptions, 'intensity', {
  min: 1,
  max: 60
})

tweakpane.addBinding(fireworksOptions, 'friction', {
  min: 0.5,
  max: 3
})

tweakpane.addBinding(fireworksOptions, 'gravity', {
  min: 0,
  max: 10
})

tweakpane.addBinding(fireworksOptions, 'opacity', {
  min: 0,
  max: 1,
  step: 0.1
})

tweakpane.addBinding(fireworksOptions, 'particles', {
  step: 1,
  min: 1,
  max: 200
})

tweakpane.addBinding(fireworksOptions, 'traceLength', {
  min: 1,
  max: 10
})

tweakpane.addBinding(fireworksOptions, 'traceSpeed', {
  min: 1,
  max: 100,
  step: 1
})

tweakpane.addBinding(fireworksOptions, 'rocketsPoint', {
  min: 0,
  max: 100,
  step: 1
})

tweakpane.addBinding(fireworksOptions.lineWidth!, 'explosion', {
  label: 'lineWidth (explosion)',
  min: 0,
  max: 10
})

tweakpane.addBinding(fireworksOptions.lineWidth!, 'trace', {
  label: 'lineWidth (trace)',
  min: 0,
  max: 10
})

tweakpane.addBinding(fireworksOptions, 'lineStyle', {
  options: {
    round: 'round',
    square: 'square'
  }
})

/** mouse events */
const mouse = tweakpane.addFolder({
  title: 'mouse',
  expanded: false
})

mouse.addBinding(fireworksOptions.mouse!, 'click', {
  label: 'mouse click'
})

mouse.addBinding(fireworksOptions.mouse!, 'max', {
  label: 'maximum rockets',
  min: 1,
  max: 15,
  step: 1
})

mouse.addBinding(fireworksOptions.mouse!, 'move', {
  label: 'follow mouse'
})

/** sounds */
const sound = tweakpane.addFolder({
  title: 'sound',
  expanded: false
})

sound.addBinding(fireworksOptions.sound!, 'enabled')

sound.addBinding(fireworksOptions.sound!, 'volume', {
  min: 0,
  max: 100,
  step: 1
})

tweakpane.on('change', () => {
  fireworks.updateOptions(fireworksOptions)
})

/** background */
const background = tweakpane.addFolder({
  title: 'background',
  expanded: false
})

background.addBinding(backgroundConfig, 'container').on('change', ({ value }) => {
  mainContainer.style.display = value ? 'none' : 'block'
})

background.addBinding(backgroundConfig, 'color').on('change', ({ value }) => {
  fireworksContainer.style.backgroundColor = value
})

background.addBinding(backgroundConfig, 'image').on('change', ({ value }) => {
  fireworksContainer.style.backgroundImage = `url(${value})`
})

background.addBinding(backgroundConfig, 'size').on('change', ({ value }) => {
  fireworksContainer.style.backgroundSize = value
})

background.addBinding(backgroundConfig, 'position').on('change', ({ value }) => {
  fireworksContainer.style.backgroundPosition = value
})

background.addBinding(backgroundConfig, 'repeat').on('change', ({ value }) => {
  fireworksContainer.style.backgroundRepeat = value
})

/** monitors */
const monitors = tweakpane.addFolder({
  title: 'monitors',
  expanded: false
})

const fpsGraph = monitors.addBlade({
  view: 'fpsgraph',
  label: 'fps'
}) as FpsGraphBladeApi

monitors.addBinding(fireworksGetters, 'particles', {
  view: 'graph',
  label: 'particles',
  min: 0,
  max: 5000,
  readonly: true
})

monitors.addBinding(fireworksGetters, 'traces', {
  view: 'graph',
  label: 'traces',
  min: 0,
  max: 50,
  readonly: true
})

const updateGraph = () => {
  fpsGraph.begin()
  fpsGraph.end()
  requestAnimationFrame(updateGraph)
}

requestAnimationFrame(updateGraph)

/** fullscreen */
declare global {
  interface Element {
    webkitRequestFullscreen?(): void
    mozRequestFullScreen?(): void
    msRequestFullscreen?(): void
  }
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'F11') {
    event.preventDefault()

    if (fireworksContainer.requestFullscreen) {
      fireworksContainer.requestFullscreen()
    } else if (fireworksContainer.webkitRequestFullscreen) {
      fireworksContainer.webkitRequestFullscreen()
    } else if (fireworksContainer.mozRequestFullScreen) {
      fireworksContainer.mozRequestFullScreen()
    } else if (fireworksContainer.msRequestFullscreen) {
      fireworksContainer.msRequestFullscreen()
    }
  }
})
