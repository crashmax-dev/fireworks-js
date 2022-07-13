import { deepMerge } from './helpers.js'
import type {
  FireworksOptions,
  IBoundaries,
  IBrightness,
  IMouse,
  ISounds,
  LineStyle,
  LineWidth,
  MinMaxValues
} from './types.js'

class Options implements FireworksOptions {
  public hue: MinMaxValues
  public rocketsPoint: MinMaxValues
  public opacity: number
  public acceleration: number
  public friction: number
  public gravity: number
  public particles: number
  public trace: number
  public explosion: number
  public mouse: IMouse
  public boundaries: IBoundaries
  public sound: ISounds
  public delay: MinMaxValues
  public brightness: IBrightness
  public flickering: number
  public intensity: number
  public traceSpeed: number
  public lineWidth: LineWidth
  public lineStyle: LineStyle
  public autoresize: boolean

  constructor() {
    this.autoresize = true
    this.lineStyle = 'round'
    this.flickering = 50
    this.trace = 3
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
      max: 255
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
      min: 15,
      max: 30
    }

    this.brightness = {
      min: 50,
      max: 80,
      decay: {
        min: 0.015,
        max: 0.03
      }
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
      height: 0,
      width: 0,
      x: 50,
      y: 50
    }
  }

  updateOptions<T extends FireworksOptions>(options: T): void {
    Object.assign(this, deepMerge(this, options))
  }
}

const opts = new Options()
export { opts }
