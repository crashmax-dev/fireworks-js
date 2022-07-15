import { Explosion } from './explosion.js'
import { randomFloat, randomInt } from './helpers.js'
import { Mouse } from './mouse.js'
import { opts } from './options.js'
import { Resize } from './resize.js'
import { Sound } from './sound.js'
import { Trace } from './trace.js'
import { FireworksOptions, IBoundaries, Sizes } from './types.js'

declare const version: string

export class Fireworks {
  private container: Element
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number

  private tick = 0
  private timestamp = performance.now()
  private running = false

  private sound: Sound
  private resize: Resize
  private mouse: Mouse
  private traces: Trace[] = []
  private explosions: Explosion[] = []

  constructor(
    container: Element | HTMLCanvasElement,
    options: FireworksOptions = {}
  ) {
    this.container = container

    if (container instanceof HTMLCanvasElement) {
      this.canvas = container
    } else {
      this.canvas = document.createElement('canvas')
      this.container.appendChild(this.canvas)
    }

    this.ctx = this.canvas.getContext('2d')!

    this.updateOptions(options)
    this.updateSize()

    this.sound = new Sound()
    this.resize = new Resize(this)
    this.mouse = new Mouse(this.canvas)
  }

  get isRunning(): boolean {
    return this.running
  }

  get version(): string {
    return version
  }

  start(): void {
    if (this.running) return

    this.running = true
    this.resize.subscribe()
    this.mouse.subscribe()
    this.clear()
    this.render()
  }

  stop(): void {
    if (!this.running) return

    this.running = false
    this.resize.unsubscribe()
    this.mouse.unsubscribe()
    this.clear()
  }

  pause(): void {
    this.running = !this.running
    if (this.running) {
      this.render()
    }
  }

  clear(): void {
    if (!this.ctx) return

    this.traces = []
    this.explosions = []
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  updateOptions(options: FireworksOptions): void {
    opts.updateOptions(options)
  }

  updateSize({
    width = this.container instanceof HTMLCanvasElement
      ? this.canvas.width
      : this.container.clientWidth,
    height = this.container instanceof HTMLCanvasElement
      ? this.canvas.height
      : this.container.clientHeight
  }: Partial<Sizes> = {}): void {
    this.width = width
    this.height = height

    this.canvas.width = width
    this.canvas.height = height

    this.updateBoundaries({
      ...opts.boundaries,
      width,
      height
    })
  }

  updateBoundaries(boundaries: Partial<IBoundaries>): void {
    this.updateOptions({ boundaries })
  }

  private render(timestamp = this.timestamp): void {
    if (!this.ctx || !this.running) return

    requestAnimationFrame((timestamp) => this.render(timestamp))

    this.ctx.globalCompositeOperation = 'destination-out'
    this.ctx.fillStyle = `rgba(0, 0, 0, ${opts.opacity})`
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.lineCap = opts.lineStyle
    this.ctx.lineJoin = 'round'

    this.initTrace()
    this.drawTrace()
    this.drawExplosion()

    const timeDiff = timestamp - this.timestamp
    this.timestamp = timestamp
    this.tick += (timeDiff * (opts.intensity * Math.PI)) / 1000
  }

  private initTrace(): void {
    const {
      hue,
      delay,
      rocketsPoint,
      boundaries,
      trace,
      traceSpeed,
      acceleration,
      mouse
    } = opts

    if (
      this.tick > randomInt(delay.min, delay.max) ||
      (this.mouse.active && mouse.max > this.traces.length)
    ) {
      this.traces.push(
        new Trace({
          x: (this.width * randomInt(rocketsPoint.min, rocketsPoint.max)) / 100,
          y: this.height,
          dx:
            (this.mouse.x && mouse.move) || this.mouse.active
              ? this.mouse.x
              : randomInt(boundaries.x, boundaries.width - boundaries.x * 2),
          dy:
            (this.mouse.y && mouse.move) || this.mouse.active
              ? this.mouse.y
              : randomInt(boundaries.y, boundaries.height * 0.5),
          ctx: this.ctx,
          hue: randomInt(hue.min, hue.max),
          speed: traceSpeed,
          acceleration,
          traceLength: trace
        })
      )

      this.tick = 0
    }
  }

  private drawTrace(): void {
    this.ctx.lineWidth = randomFloat(
      opts.lineWidth.trace.min,
      opts.lineWidth.trace.max
    )

    let traceLength = this.traces.length
    while (traceLength--) {
      this.traces[traceLength]!.draw()
      this.traces[traceLength]!.update((x: number, y: number, hue: number) => {
        this.initExplosion(x, y, hue)
        this.sound.play()
        this.traces.splice(traceLength, 1)
      })
    }
  }

  private initExplosion(x: number, y: number, hue: number): void {
    const {
      particles,
      flickering,
      lineWidth,
      explosion,
      brightness,
      friction,
      gravity,
      decay
    } = opts

    let particlesLength = particles
    while (particlesLength--) {
      this.explosions.push(
        new Explosion({
          x,
          y,
          ctx: this.ctx,
          hue,
          friction,
          gravity,
          flickering: randomInt(0, 100) <= flickering,
          lineWidth: randomFloat(
            lineWidth.explosion.min,
            lineWidth.explosion.max
          ),
          explosionLength: Math.round(explosion),
          brightness,
          decay
        })
      )
    }
  }

  private drawExplosion(): void {
    let length = this.explosions.length
    while (length--) {
      this.explosions[length]!.draw()
      this.explosions[length]!.update(() => {
        this.explosions.splice(length, 1)
      })
    }
  }
}
