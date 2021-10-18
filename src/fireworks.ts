import { Trace } from './trace'
import { Sound } from './sound'
import { Explosion } from './explosion'
import { randomInteger } from './utils'

type HTMLContainer = Element | HTMLElement

export interface FireworksOptions {
  hue?: MinMaxOptions
  rocketsPoint?: number
  speed?: number
  acceleration?: number
  friction?: number
  gravity?: number
  particles?: number
  trace?: number
  explosion?: number
  autoresize?: boolean
  mouse?: MouseOptions
  boundaries?: BoundariesOptions
  sound?: SoundOptions
  delay?: MinMaxOptions
  brightness?: BrightnessOptions
}

export interface BrightnessOptions {
  min: number
  max: number
  decay?: MinMaxOptions
}

export interface MouseOptions {
  click?: boolean
  move?: boolean
  max?: number
}

export interface BoundariesOptions {
  visible: boolean
  x: number
  y: number
  width: number
  height: number
}

export interface SoundOptions {
  enable: boolean
  files?: string[]
  volume?: MinMaxOptions
}

interface MinMaxOptions {
  min: number
  max: number
}

interface Sizes {
  width?: number
  height?: number
}

declare const version: string

export class Fireworks {
  private _container: HTMLContainer
  private _canvas: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D
  private _width: number
  private _height: number

  private hue: MinMaxOptions = {
    min: 0,
    max: 360
  }
  private rocketsPoint = 50
  private speed = 2
  private acceleration = 0.05
  private friction = 0.95
  private gravity = 1.5
  private particles = 50
  private trace = 3
  private explosion = 5
  private autoresize = true
  private boundaries: BoundariesOptions = {
    visible: false,
    x: 50,
    y: 50,
    width: 0,
    height: 0
  }
  private mouse: Required<MouseOptions> = {
    click: false,
    move: false,
    max: 3
  }
  private delay: MinMaxOptions = {
    min: 15,
    max: 30
  }
  private brightness: Required<BrightnessOptions> = {
    min: 50,
    max: 80,
    decay: {
      min: 0.015,
      max: 0.03
    }
  }

  private _tick = 0
  private _version = version
  private _running = false
  private _randomRocketsPoint = false
  private _m = false
  private _mx: number
  private _my: number
  private _ds: number

  private _sound: Sound
  private _traces: Trace[]
  private _explosions: Explosion[]

  constructor(container: HTMLContainer, options: FireworksOptions = {}) {
    this._container = container
    this._canvas = document.createElement('canvas')
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D
    this._container.appendChild(this._canvas)
    this._sound = new Sound(options.sound)

    this.setOptions(options)
    this.setSize()

    if (this.autoresize) {
      window.addEventListener('resize', () => this.setSize())
    }

    this._canvas.addEventListener('mousedown', e => this.useMouse(e, this.mouse.click))
    this._canvas.addEventListener('mouseup', e => this.useMouse(e, false))
    this._canvas.addEventListener('mousemove', e => this.useMouse(e, this._m))
  }

  get isRunning(): boolean {
    return this._running
  }

  get version(): string {
    return this._version
  }

  start(): void {
    if (this._running) return

    this._running = true
    this.clear()
    this.render()
  }

  stop(): void {
    this._running = false
    this.clear()
  }

  pause(): void {
    this._running = !this._running

    if (this._running) {
      this.render()
    }
  }

  clear(): void {
    if (!this._ctx) return

    this._traces = []
    this._explosions = []
    this._ctx.clearRect(0, 0, this._width, this._height)
  }

  setOptions(options: Partial<FireworksOptions>): void {
    Object.assign(this, options)

    if (options.sound) {
      Object.assign(this._sound.options, options.sound)
    }
  }

  setSize({
    width = this._container.clientWidth,
    height = this._container.clientHeight
  }: Sizes = {}): void {
    this._width = width
    this._height = height

    this._canvas.width = width
    this._canvas.height = height

    this.setBoundaries({
      width,
      height
    })
  }

  setBoundaries(boundaries: Partial<BoundariesOptions>): void {
    this.boundaries = {
      ...this.boundaries,
      ...boundaries
    }
  }

  private useMouse(event: MouseEvent, is: boolean): void {
    if (this.mouse.click || this.mouse.move) {
      this._mx = event.pageX - this._canvas.offsetLeft
      this._my = event.pageY - this._canvas.offsetTop
      this._m = is
    }
  }

  private render(): void {
    if (!this._ctx || !this._running) return

    requestAnimationFrame(() => this.render())

    if (this.boundaries.visible) {
      this._ctx.beginPath()
      this._ctx.strokeStyle = 'red'
      this._ctx.rect(
        this.boundaries.x,
        this.boundaries.y,
        this.boundaries.width - this.boundaries.x * 2,
        this.boundaries.height * 0.5
      )
      this._ctx.stroke()
    }

    this._ctx.globalCompositeOperation = 'destination-out'
    this._ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    this._ctx.fillRect(0, 0, this._width, this._height)
    this._ctx.globalCompositeOperation = 'lighter'

    this.initTrace()
    this.drawTrace()
    this.drawExplosion()

    this._tick++
  }

  private initTrace() {
    this._ds = randomInteger(this.delay.min, this.delay.max)

    if (
      this._ds * 2 < this._tick ||
      this._m && this.mouse.max > this._traces.length
    ) {
      this._traces.push(
        new Trace({
          x: this._width * (
            this._randomRocketsPoint ?
              randomInteger(0, 100) :
              this.rocketsPoint
          ) / 100,
          y: this._height,
          dx: this._m ||
            this.mouse.move
            ? this._mx
            : randomInteger(this.boundaries.x, this.boundaries.width - this.boundaries.x * 2),
          dy: this._m ||
            this.mouse.move
            ? this._my
            : randomInteger(this.boundaries.y, this.boundaries.height * 0.5),
          ctx: this._ctx,
          hue: randomInteger(this.hue.min, this.hue.max),
          speed: this.speed,
          acceleration: this.acceleration,
          traceLength: this.trace
        })
      )

      this._tick = 0
    }
  }

  private drawTrace() {
    let length = this._traces.length

    while (length--) {
      this._traces[length].draw()
      this._traces[length].update((x: number, y: number, hue: number) => {
        this.initExplosion(x, y, hue)
        this._sound.play()
        this._traces.splice(length, 1)
      })
    }
  }

  private initExplosion(x: number, y: number, hue: number) {
    let count = this.particles

    while (count--) {
      this._explosions.push(
        new Explosion({
          x,
          y,
          ctx: this._ctx,
          hue,
          friction: this.friction,
          gravity: this.gravity,
          explosionLength: this.explosion,
          brightness: this.brightness
        })
      )
    }
  }

  private drawExplosion() {
    let length = this._explosions.length

    while (length--) {
      this._explosions[length].draw()
      this._explosions[length].update(() => {
        this._explosions.splice(length, 1)
      })
    }
  }
}