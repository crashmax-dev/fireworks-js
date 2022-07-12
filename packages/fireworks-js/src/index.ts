import { Explosion } from './explosion.js'
import { randomFloat, randomInt } from './helpers.js'
import { Mouse } from './mouse.js'
import { Sound } from './sound.js'
import { Trace } from './trace.js'
import {
  IBoundaries,
  IBrightness,
  FireworksOptions,
  LineStyle,
  LineWidth,
  MinMaxValues,
  IMouse,
  Sizes
} from './types.js'

declare const version: string

class Fireworks {
  [key: string]: unknown

  private _container: Element
  private _canvas: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D
  private _width: number
  private _height: number

  private hue: MinMaxValues
  private rocketsPoint: MinMaxValues
  private opacity: number
  private acceleration: number
  private friction: number
  private gravity: number
  private particles: number
  private trace: number
  private flickering: number
  private intensity: number
  private explosion: number
  private boundaries: Required<IBoundaries>
  private mouse: Required<IMouse>
  private delay: MinMaxValues
  private brightness: Required<IBrightness>
  private traceSpeed: number
  private lineWidth: LineWidth
  private lineStyle: LineStyle
  private autoresize: boolean

  private _tick = 0
  private _timestamp = performance.now()
  private _version = version
  private _running = false
  private _delay: number

  private _sound: Sound
  private _mouse: Mouse
  private _traces: Trace[]
  private _explosions: Explosion[]

  constructor(
    container: Element | HTMLCanvasElement,
    {
      boundaries,
      brightness,
      delay,
      hue,
      mouse,
      sound,
      rocketsPoint,
      lineWidth,
      autoresize = true,
      lineStyle = 'round',
      flickering = 50,
      trace = 3,
      traceSpeed = 10,
      intensity = 30,
      explosion = 5,
      gravity = 1.5,
      opacity = 0.5,
      particles = 50,
      friction = 0.95,
      acceleration = 1.05
    }: FireworksOptions = {}
  ) {
    if (container instanceof HTMLCanvasElement) {
      this._container = container
      this._canvas = container
    } else {
      this._container = container
      this._canvas = document.createElement('canvas')
      this._container.appendChild(this._canvas)
    }

    this.trace = trace
    this.explosion = explosion
    this.gravity = gravity
    this.opacity = opacity
    this.particles = particles
    this.friction = friction
    this.acceleration = acceleration
    this.flickering = flickering
    this.intensity = intensity
    this.traceSpeed = traceSpeed
    this.lineStyle = lineStyle
    this.autoresize = autoresize

    this.hue = {
      min: 0,
      max: 255,
      ...hue
    }

    this.rocketsPoint = {
      min: 50,
      max: 50,
      ...rocketsPoint
    }

    this.lineWidth = {
      explosion: {
        min: 1,
        max: 3
      },
      trace: {
        min: 1,
        max: 2
      },
      ...lineWidth
    }

    this.mouse = {
      click: false,
      move: false,
      max: 1,
      ...mouse
    }

    this.delay = {
      min: 15,
      max: 30,
      ...delay
    }

    this.brightness = {
      min: 50,
      max: 80,
      decay: {
        min: 0.015,
        max: 0.03
      },
      ...brightness
    }

    this.setSize()
    this.setBoundaries({
      visible: false,
      x: 50,
      y: 50,
      ...boundaries
    })

    this._ctx = this._canvas.getContext('2d')!
    this._sound = new Sound(sound)
    this._mouse = new Mouse(this._canvas, this.mouse)
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

    if (this.autoresize) {
      window.addEventListener('resize', () => this.bindWindowResize())
    }

    this._mouse.subscribeListeners()
    this.clear()
    this.render()
  }

  stop(): void {
    if (!this._running) return
    this._running = false

    if (this.autoresize) {
      window.removeEventListener('resize', this.bindWindowResize)
    }

    this._mouse.unsubscribeListeners()
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

  setOptions(options: FireworksOptions): void {
    for (const [key, value] of Object.entries(options)) {
      const hasOption = Object.prototype.hasOwnProperty.call(this, key)

      if (typeof this[key] === 'function') {
        throw new Error('You cannot change the methods of the class!')
      }

      if (hasOption) {
        if (typeof this[key] === 'object') {
          // @ts-ignore
          Object.assign(this[key], value)
        } else {
          this[key] = value
        }
      }

      if (key === 'sound') {
        Object.assign(this._sound.options, value)
      }
    }
  }

  setSize({
    width = this._container instanceof HTMLCanvasElement
      ? this._canvas.width
      : this._container.clientWidth,
    height = this._container instanceof HTMLCanvasElement
      ? this._canvas.height
      : this._container.clientHeight
  }: Partial<Sizes> = {}): void {
    this._width = width
    this._height = height

    this._canvas.width = width
    this._canvas.height = height

    this.setBoundaries({
      width,
      height
    })
  }

  setBoundaries(boundaries: Partial<IBoundaries>): void {
    this.boundaries = {
      ...this.boundaries,
      ...boundaries
    }
  }

  private bindWindowResize(): void {
    this.setSize()
  }

  private render(timestamp = this._timestamp): void {
    if (!this._ctx || !this._running) return

    requestAnimationFrame((timestamp) => this.render(timestamp))

    this._ctx.globalCompositeOperation = 'destination-out'
    this._ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`
    this._ctx.fillRect(0, 0, this._width, this._height)
    this._ctx.globalCompositeOperation = 'lighter'
    this._ctx.lineCap = this.lineStyle
    this._ctx.lineJoin = 'round'

    this.drawBoundaries()
    this.initTrace()
    this.drawTrace()
    this.drawExplosion()

    const timeDiff = timestamp - this._timestamp
    this._timestamp = timestamp
    this._tick += (timeDiff * (this.intensity * Math.PI)) / 1000
  }

  private drawBoundaries() {
    if (this.boundaries.visible) {
      this._ctx.beginPath()
      this._ctx.lineWidth = 1
      this._ctx.strokeStyle = 'red'
      this._ctx.rect(
        this.boundaries.x,
        this.boundaries.y,
        this.boundaries.width - this.boundaries.x * 2,
        this.boundaries.height * 0.5
      )
      this._ctx.stroke()
    }
  }

  private initTrace(): void {
    this._delay = randomInt(this.delay.min, this.delay.max)

    if (
      this._tick > this._delay ||
      (this._mouse.hasMove && this.mouse.max > this._traces.length)
    ) {
      this._traces.push(
        new Trace({
          x:
            (this._width *
              randomInt(this.rocketsPoint.min, this.rocketsPoint.max)) /
            100,
          y: this._height,
          dx:
            (this._mouse.cursorX && this.mouse.move) || this._mouse.hasMove
              ? this._mouse.cursorX
              : randomInt(
                this.boundaries.x,
                this.boundaries.width - this.boundaries.x * 2
              ),
          dy:
            (this._mouse.cursorY && this.mouse.move) || this._mouse.hasMove
              ? this._mouse.cursorY
              : randomInt(this.boundaries.y, this.boundaries.height * 0.5),
          ctx: this._ctx,
          hue: randomInt(this.hue.min, this.hue.max),
          speed: this.traceSpeed,
          acceleration: this.acceleration,
          traceLength: this.trace
        })
      )

      this._tick = 0
    }
  }

  private drawTrace(): void {
    let length = this._traces.length
    this._ctx.lineWidth = randomFloat(
      this.lineWidth.trace.min,
      this.lineWidth.trace.max
    )

    while (length--) {
      this._traces[length]!.draw()
      this._traces[length]!.update((x: number, y: number, hue: number) => {
        this.initExplosion(x, y, hue)
        this._sound.play()
        this._traces.splice(length, 1)
      })
    }
  }

  private initExplosion(x: number, y: number, hue: number): void {
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
          flickering: randomInt(0, 100) <= this.flickering,
          lineWidth: randomFloat(
            this.lineWidth.explosion.min,
            this.lineWidth.explosion.max
          ),
          explosionLength: Math.round(this.explosion),
          brightness: this.brightness
        })
      )
    }
  }

  private drawExplosion(): void {
    let length = this._explosions.length

    while (length--) {
      this._explosions[length]!.draw()
      this._explosions[length]!.update(() => {
        this._explosions.splice(length, 1)
      })
    }
  }
}

export { Fireworks }
export type { FireworksOptions }
export default Fireworks
