import { Trace } from './trace'
import { Sound } from './sound'
import { Explosion } from './explosion'
import { randomInteger } from './utils'

type HTMLContainer = Element | HTMLElement

interface FireworksOptions {
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

interface BrightnessOptions {
  min: number
  max: number
  decay?: MinMaxOptions
}

interface MouseOptions {
  click?: boolean
  move?: boolean
  max?: number
}

interface BoundariesOptions {
  x: number
  y: number
  width: number
  height: number
}

interface SoundOptions {
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

class Fireworks {
  [key: string]: unknown

  private _container: HTMLContainer
  private _canvas: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D
  private _width: number
  private _height: number

  private _hue: MinMaxOptions
  private _rocketsPoint: number
  private _speed: number
  private _acceleration: number
  private _friction: number
  private _gravity: number
  private _particleCount: number
  private _traceLength: number
  private _explosionLength: number
  private _autoresize: boolean
  private _boundaries: BoundariesOptions
  private _mouse: Required<MouseOptions>
  private _delay: MinMaxOptions
  private _brightness: Required<BrightnessOptions>

  private _tick = 0
  private _version = version
  private _running = false
  private _visibleBoundaries = false
  private _randomRocketsPoint = false
  private _m = false
  private _mx: number
  private _my: number
  private _ds: number

  private _sound: Sound
  private _traces: Trace[]
  private _explosions: Explosion[]

  constructor(container: HTMLContainer, {
    acceleration,
    autoresize,
    boundaries,
    brightness,
    delay,
    explosion,
    friction,
    gravity,
    hue,
    mouse,
    particles,
    sound,
    speed,
    rocketsPoint,
    trace
  }: FireworksOptions = {}) {
    this._container = container
    this._canvas = document.createElement('canvas')
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D
    this._container.appendChild(this._canvas)
    this._sound = new Sound(sound)

    this.setSize()
    this.setBoundaries({
      x: 50,
      y: 50,
      ...boundaries
    })

    this._rocketsPoint = rocketsPoint ?? 50
    this._speed = speed ?? 2
    this._acceleration = acceleration ?? 1.05
    this._friction = friction ?? 0.95
    this._gravity = gravity ?? 1.5
    this._particleCount = particles ?? 50
    this._traceLength = trace ?? 3
    this._explosionLength = explosion ?? 5
    this._autoresize = autoresize ?? true

    this._hue = {
      min: 0,
      max: 360,
      ...hue
    }

    this._mouse = {
      click: false,
      move: false,
      max: 3,
      ...mouse
    }

    this._delay = {
      min: 15,
      max: 30,
      ...delay
    }

    this._brightness = {
      min: 50,
      max: 80,
      decay: {
        min: 0.015,
        max: 0.03
      },
      ...brightness
    }

    if (this._autoresize) {
      window.addEventListener('resize', () => this.setSize())
    }

    this._canvas.addEventListener('mousedown', e => this.useMouse(e, this._mouse.click))
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

  /**
   * Changing fireworks parameters
   *
   * @param key
   * @param value
   */
  setOptions<T extends keyof FireworksOptions>(
    key: T,
    value: Partial<FireworksOptions[T]>
  ): void {
    switch (key) {
      case 'sound':
        Object.assign(this._sound.options, value)
        break
      default:
        if (typeof value === 'object') {
          Object.assign(this[`_${key}`], value)
        } else {
          this[`_${key}`] = value
        }
    }
  }

  /**
   * Changing the container canvas size
   *
   * @param {Sizes}
   */
  setSize({
    width = this._container.clientWidth,
    height = this._container.clientHeight
  }: Sizes = {}): void {
    this._width = width
    this._height = height

    this._canvas.width = width
    this._canvas.height = height

    this.setBoundaries({ width, height })
  }

  /**
   * Show/hide border firework boundaries
   */
  visibleBoudaries(): void {
    this._visibleBoundaries = !this._visibleBoundaries
  }

  /**
   * Changing the boundaries of fireworks
   *
   * @param boundaries
   */
  setBoundaries(boundaries: Partial<BoundariesOptions>): void {
    this._boundaries = { ...this._boundaries, ...boundaries }
  }

  private useMouse(event: MouseEvent, is: boolean): void {
    if (this._mouse.click || this._mouse.move) {
      this._mx = event.pageX - this._canvas.offsetLeft
      this._my = event.pageY - this._canvas.offsetTop
      this._m = is
    }
  }

  private render(): void {
    if (!this._ctx || !this._running) return

    requestAnimationFrame(() => this.render())

    if (this._visibleBoundaries) {
      this._ctx.beginPath()
      this._ctx.strokeStyle = 'red'
      this._ctx.rect(
        this._boundaries.x,
        this._boundaries.y,
        this._boundaries.width - this._boundaries.x * 2,
        this._boundaries.height * 0.5
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
    this._ds = randomInteger(this._delay.min, this._delay.max)

    if (
      this._ds * 2 < this._tick ||
      this._m && this._mouse.max > this._traces.length
    ) {
      this._traces.push(
        new Trace({
          x: this._width * (
            this._randomRocketsPoint ?
              randomInteger(0, 100) :
              this._rocketsPoint
          ) / 100,
          y: this._height,
          dx: this._m ||
            this._mouse.move
            ? this._mx
            : randomInteger(this._boundaries.x, this._boundaries.width - this._boundaries.x * 2),
          dy: this._m ||
            this._mouse.move
            ? this._my
            : randomInteger(this._boundaries.y, this._boundaries.height * 0.5),
          ctx: this._ctx,
          hue: randomInteger(this._hue.min, this._hue.max),
          speed: this._speed,
          acceleration: this._acceleration,
          traceLength: this._traceLength
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
    let count = this._particleCount

    while (count--) {
      this._explosions.push(
        new Explosion({
          x,
          y,
          ctx: this._ctx,
          hue,
          friction: this._friction,
          gravity: this._gravity,
          explosionLength: this._explosionLength,
          brightness: this._brightness
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

export { Fireworks, FireworksOptions, MouseOptions, BoundariesOptions, SoundOptions, BrightnessOptions }