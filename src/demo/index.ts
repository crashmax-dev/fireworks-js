import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { Fireworks } from '../fireworks'
import type { FireworksOptions } from '../fireworks'
import type { FpsGraphBladeApi } from '@tweakpane/plugin-essentials/dist/types/fps-graph/api/fps-graph'

const fireworksContainer = document.querySelector('.fireworks-container')!
const fireworksOptions: FireworksOptions = {
  hue: {
    min: 0,
    max: 345
  },
  delay: {
    min: 15,
    max: 15
  },
  rocketsPoint: {
    min: 50,
    max: 50
  },
  opacity: 0.5, // fillStyle
  acceleration: 1.02,
  friction: 0.97,
  gravity: 1.5,
  particles: 90,
  trace: 3,
  traceSpeed: 10,
  explosion: 6,
  intensity: 30,
  flickering: 50,
  lineStyle: 'round',
  lineWidth: {
    explosion: {
      min: 1,
      max: 4
    },
    trace: {
      min: 0.1,
      max: 1
    }
  },
  autoresize: true,
  brightness: {
    min: 50,
    max: 80,
    decay: {
      min: 0.015,
      max: 0.03
    }
  },
  boundaries: {
    x: 50,
    y: 50,
    width: fireworksContainer.clientWidth,
    height: fireworksContainer.clientHeight,
    visible: false
  },
  sound: {
    enabled: false,
    files: [
      location.href + 'sounds/explosion0.mp3',
      location.href + 'sounds/explosion1.mp3',
      location.href + 'sounds/explosion2.mp3'
    ],
    volume: {
      min: 2,
      max: 4
    }
  },
  mouse: {
    click: true,
    move: false,
    max: 10
  }
}

const background = {
  color: '#000000',
  image: '',
  size: 'cover',
  position: '50% 50%',
  repeat: 'no-repeat',
  container: false,
  fps: false
}

const fireworks = new Fireworks(fireworksContainer, fireworksOptions)
fireworks.start()

const fireworksGetters = {
  get traces(): number {
    // @ts-expect-error
    return fireworks._traces.length
  },
  get particles(): number {
    // @ts-expect-error
    return fireworks._explosions.length
  }
}

const tweakpane = new Pane({
  document,
  expanded: true,
  title: document.title
})

tweakpane.registerPlugin(EssentialsPlugin)

const tabs = tweakpane.addTab({
  pages: [
    { title: 'Options' },
    { title: 'Monitors' }
  ]
})

const [options, monitors] = tabs.pages

const fpsGraph = monitors.addBlade({
  view: 'fpsgraph',
  label: 'fps'
}) as FpsGraphBladeApi

monitors.addMonitor(fireworksGetters, 'particles', {
  view: 'graph',
  label: 'particles',
  min: 0,
  max: 5000
})

monitors.addMonitor(fireworksGetters, 'traces', {
  view: 'graph',
  label: 'traces',
  min: 0,
  max: 50
})

options.addInput(fireworksOptions, 'acceleration', {
  min: 1,
  max: 2,
  step: 0.01
})

tabs.on('change', () => {
  fireworks.setOptions(fireworksOptions)
})

const update = () => {
  fpsGraph.begin()
  fpsGraph.end()
  requestAnimationFrame(update)
}

requestAnimationFrame(update)
