import { Trace } from './trace'
import { Sound } from './sound'
import { Explosion } from './explosion'
import { randomInt } from './helpers'

type HTMLContainer = Element | HTMLElement

export interface FireworksOptions {
  hue?: MinMaxOptions
  rocketsPoint?: number
  opacity?: number
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

export interface BrightnessOptions extends MinMaxOptions {
  decay?: MinMaxOptions
}

export interface MouseOptions {
  click?: boolean
  move?: boolean
  max?: number
}

export interface BoundariesOptions {
  visible?: boolean
  x?: number
  y?: number
  width?: number
  height?: number
}

export interface SoundOptions {
  enabled?: boolean
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
  [key: string]: unknown

  private _container: HTMLContainer
  private _canvas: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D
  private _width: number
  private _height: number

  private hue: MinMaxOptions
  private rocketsPoint: number
  private opacity: number
  private speed: number
  private acceleration: number
  private friction: number
  private gravity: number
  private particles: number
  private trace: number
  private explosion: number
  private autoresize: boolean
  private boundaries: Required<BoundariesOptions>
  private mouse: Required<MouseOptions>
  private delay: MinMaxOptions
  private brightness: Required<BrightnessOptions>

  private _tick = 0
  private _version = version
  private _running = false
  private _randomRocketsPoint = false
  private _experimentals = false
  private _m = false
  private _mx: number
  private _my: number
  private _ds: number

  private _sound: Sound
  private _traces: Trace[]
  private _explosions: Explosion[]

  constructor(container: HTMLContainer, {
    autoresize = true,
    boundaries,
    brightness,
    delay,
    hue,
    mouse,
    sound,
    trace = 3,
    speed = 2,
    explosion = 5,
    gravity = 1.5,
    opacity = 0.5,
    particles = 50,
    friction = 0.95,
    rocketsPoint = 50,
    acceleration = 1.05
  }: FireworksOptions = {}) {
    this._container = container
    this._canvas = document.createElement('canvas')
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D
    this._container.appendChild(this._canvas)
    this._sound = new Sound(sound)

    this.setSize()
    this.setBoundaries({
      visible: false,
      x: 50,
      y: 50,
      ...boundaries
    })

    this.autoresize = autoresize
    this.trace = trace
    this.speed = speed
    this.explosion = explosion
    this.gravity = gravity
    this.opacity = opacity
    this.particles = particles
    this.friction = friction
    this.rocketsPoint = rocketsPoint
    this.acceleration = acceleration

    this.hue = {
      min: 0,
      max: 360,
      ...hue
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

    if (this.autoresize) {
      window.addEventListener('resize', () => this.windowResize())
    }

    this._canvas.addEventListener('mousedown', e => this.mouseDown(e))
    this._canvas.addEventListener('mouseup', e => this.mouseUp(e))
    this._canvas.addEventListener('mousemove', e => this.mouseMove(e))
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
    if (!this._running) return

    this._running = false
    this.clear()
  }

  unmount(): void {
    window.removeEventListener('resize', this.windowResize)
    this._canvas.addEventListener('mousedown', this.mouseDown)
    this._canvas.addEventListener('mouseup', this.mouseUp)
    this._canvas.addEventListener('mousemove', this.mouseMove)
  }

  pause(): void {
    this._running = !this._running
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
    width = this._container.clientWidth,
    height = this._container.clientHeight
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

  private windowResize(): void {
    this.setSize()
  }

  private mouseDown(event: MouseEvent): void {
    this.useMouse(event, this.mouse.click)
  }

  private mouseUp(event: MouseEvent): void {
    this.useMouse(event, false)
  }

  private mouseMove(event: MouseEvent): void {
    this.useMouse(event, this._m)
  }

  private render(): void {
    if (!this._ctx || !this._running) return

    requestAnimationFrame(() => this.render())

    this._ctx.globalCompositeOperation = 'destination-out'
    this._ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`
    this._ctx.fillRect(0, 0, this._width, this._height)
    this._ctx.globalCompositeOperation = 'lighter'

    this.drawBoundaries()
    this.initTrace()
    this.drawTrace()
    this.drawExplosion()

    this._tick++
  }

  private drawBoundaries() {
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
  }

  private initTrace(): void {
    this._ds = randomInt(this.delay.min, this.delay.max)

    if (
      (this._ds * 2 < this._tick) ||
      (this._m && this.mouse.max > this._traces.length)
    ) {
      this._traces.push(
        new Trace({
          x: this._width * (
            this._randomRocketsPoint ?
              randomInt(0, 100) :
              this.rocketsPoint
          ) / 100,
          y: this._height,
          dx: (this._mx && this.mouse.move) || this._m ?
            this._mx :
            randomInt(this.boundaries.x, this.boundaries.width - this.boundaries.x * 2),
          dy: (this._my && this.mouse.move) || this._m ?
            this._my :
            randomInt(this.boundaries.y, this.boundaries.height * 0.5),
          ctx: this._ctx,
          hue: randomInt(this.hue.min, this.hue.max),
          speed: this.speed,
          acceleration: this.acceleration,
          traceLength: this.trace
        })
      )

      this._tick = 0
    }
  }

  private drawTrace(): void {
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
          explosionLength: this.explosion,
          brightness: this.brightness,
          exp: this._experimentals
        })
      )
    }
  }

  private drawExplosion(): void {
    let length = this._explosions.length

    while (length--) {
      this._explosions[length].draw()
      this._explosions[length].update(() => {
        this._explosions.splice(length, 1)
      })
    }
  }
}