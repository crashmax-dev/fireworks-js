import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import { Fireworks } from '../fireworks'
import type { FireworksOptions } from '../fireworks'
import type { FpsGraphBladeApi } from '@tweakpane/plugin-essentials/dist/types/fps-graph/api/fps-graph'

const container = document.querySelector<HTMLDivElement>('.container')!
const fireworksContainer = document.querySelector<HTMLDivElement>('.fireworks-container')!
const fireworksOptions: FireworksOptions = {
  hue: {
    min: 0,
    max: 345
  },
  delay: {
    min: 30,
    max: 60
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

const backgroundConfig = {
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

/** options */
tweakpane.addInput(fireworksOptions, 'hue', {
  min: 0,
  max: 360,
  step: 1
})

tweakpane.addInput(fireworksOptions, 'acceleration', {
  min: 1,
  max: 2
})

tweakpane.addInput(fireworksOptions, 'brightness', {
  min: 1,
  max: 100,
  step: 1
})

tweakpane.addInput(fireworksOptions.brightness!, 'decay', {
  min: 0.001,
  max: 0.05
})

tweakpane.addInput(fireworksOptions, 'delay', {
  min: 10,
  max: 100
})

tweakpane.addInput(fireworksOptions, 'explosion', {
  min: 1,
  max: 10,
  step: 1
})

tweakpane.addInput(fireworksOptions, 'flickering', {
  min: 0,
  max: 100
})

tweakpane.addInput(fireworksOptions, 'intensity', {
  min: 1,
  max: 60
})

tweakpane.addInput(fireworksOptions, 'friction', {
  min: 0.5,
  max: 3
})

tweakpane.addInput(fireworksOptions, 'gravity', {
  min: 0,
  max: 10
})

tweakpane.addInput(fireworksOptions, 'opacity', {
  min: 0,
  max: 1,
  step: 0.1
})

tweakpane.addInput(fireworksOptions, 'traceSpeed', {
  min: 1,
  max: 100,
  step: 1
})

tweakpane.addInput(fireworksOptions, 'rocketsPoint', {
  min: 0,
  max: 100,
  step: 1
})

tweakpane.addInput(fireworksOptions.lineWidth!, 'explosion', {
  min: 1,
  max: 10
})

tweakpane.addInput(fireworksOptions.lineWidth!, 'trace', {
  min: 0,
  max: 10
})

tweakpane.addInput(fireworksOptions, 'autoresize')

tweakpane.addInput(fireworksOptions, 'lineStyle', {
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

mouse.addInput(fireworksOptions.mouse!, 'click', {
  label: 'mouse click'
})

mouse.addInput(fireworksOptions.mouse!, 'max', {
  label: 'maximum rockets',
  min: 1,
  max: 15,
  step: 1
})

mouse.addInput(fireworksOptions.mouse!, 'move', {
  label: 'follow mouse'
})

/** sounds */
const sound = tweakpane.addFolder({
  title: 'sound',
  expanded: false
})

sound.addInput(fireworksOptions.sound!, 'enabled')

sound.addInput(fireworksOptions.sound!, 'volume', {
  min: 0,
  max: 100,
  step: 1
})

tweakpane.on('change', () => {
  fireworks.setOptions(fireworksOptions)
})

/** background */
const background = tweakpane.addFolder({
  title: 'background',
  expanded: false
})

background
  .addInput(backgroundConfig, 'container')
  .on('change', ({ value }) => {
    container.style.display = value ? 'none' : 'block'
  })

background
  .addInput(backgroundConfig, 'color')
  .on('change', ({ value }) => {
    fireworksContainer.style.backgroundColor = value
  })

background
  .addInput(backgroundConfig, 'image')
  .on('change', ({ value }) => {
    fireworksContainer.style.backgroundImage = `url(${value})`
  })

background
  .addInput(backgroundConfig, 'size')
  .on('change', ({ value }) => {
    fireworksContainer.style.backgroundSize = value
  })

background
  .addInput(backgroundConfig, 'position')
  .on('change', ({ value }) => {
    fireworksContainer.style.backgroundPosition = value
  })

background
  .addInput(backgroundConfig, 'repeat')
  .on('change', ({ value }) => {
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

const updateGraph = () => {
  fpsGraph.begin()
  fpsGraph.end()
  requestAnimationFrame(updateGraph)
}

requestAnimationFrame(updateGraph)
