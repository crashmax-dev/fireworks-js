import { deepMerge } from './helpers.js'
import type { FireworksOptions, FireworksTypes } from './types.js'

export class Options implements FireworksTypes.Options {
  hue: FireworksTypes.MinMax
  rocketsPoint: FireworksTypes.MinMax
  opacity: number
  acceleration: number
  friction: number
  gravity: number
  particles: number
  explosion: number
  mouse: FireworksTypes.Mouse
  boundaries: FireworksTypes.Boundaries
  sound: FireworksTypes.Sounds
  delay: FireworksTypes.MinMax
  brightness: FireworksTypes.MinMax
  decay: FireworksTypes.MinMax
  flickering: number
  intensity: number
  traceLength: number
  traceSpeed: number
  lineWidth: FireworksTypes.LineWidth
  lineStyle: FireworksTypes.LineStyle
  autoresize: boolean

  constructor() {
    this.autoresize = true
    this.lineStyle = 'round'
    this.flickering = 50
    this.traceLength = 3
    this.traceSpeed = 10
    this.intensity = 30
    this.explosion = 5
    this.gravity = 1.5
    this.opacity = 0.5
    this.particles = 50
    this.friction = 0.95
    this.acceleration = 1.05

    this.hue = {
      min: 0,
      max: 360
    }

    this.rocketsPoint = {
      min: 50,
      max: 50
    }

    this.lineWidth = {
      explosion: {
        min: 1,
        max: 3
      },
      trace: {
        min: 1,
        max: 2
      }
    }

    this.mouse = {
      click: false,
      move: false,
      max: 1
    }

    this.delay = {
      min: 30,
      max: 60
    }

    this.brightness = {
      min: 50,
      max: 80
    }

    this.decay = {
      min: 0.015,
      max: 0.03
    }

    this.sound = {
      enabled: false,
      files: [
        'explosion0.mp3',
        'explosion1.mp3',
        'explosion2.mp3'
      ],
      volume: {
        min: 4,
        max: 8
      }
    }

    this.boundaries = {
      debug: false,
      height: 0,
      width: 0,
      x: 50,
      y: 50
    }
  }

  update<T extends FireworksOptions>(options: T): void {
    Object.assign(this, deepMerge(this, options))
  }
}
