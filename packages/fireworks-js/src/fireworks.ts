import { Explosion } from './explosion.js'
import { floor, randomFloat, randomInt } from './helpers.js'
import { Mouse } from './mouse.js'
import { opts } from './options.js'
import { RequestAnimationFrame } from './raf.js'
import { Resize } from './resize.js'
import { Sound } from './sound.js'
import { Trace } from './trace.js'
import { FireworksOptions, IBoundaries, Sizes } from './types.js'

export class Fireworks {
  private target: Element | HTMLCanvasElement
  private container: Element
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number
  private sound: Sound
  private resize: Resize
  private mouse: Mouse
  private traces: Trace[] = []
  private explosions: Explosion[] = []
  private waitStopRaf: (() => void) | null
  private raf: RequestAnimationFrame
  private running = false

  constructor(
    container: Element | HTMLCanvasElement,
    options: FireworksOptions = {}
  ) {
    this.target = container
    this.container = container

    this.createCanvas(this.target)
    this.updateOptions(options)

    this.sound = new Sound()
    this.resize = new Resize(this)
    this.mouse = new Mouse(this.canvas)
    this.raf = new RequestAnimationFrame(this.render.bind(this))
  }

  /**
   * 
   * Return True if program is running or False if program is not running
   * @return {boolean} Program running status
   */
  get isRunning(): boolean {
    return this.running
  }

  /**
   * 
   * Return current version
   * @return {string} Current version
   */
  get version(): string {
    return __VERSION__
  }

  /**
   * 
   *  Starts a program
   */
  start(): void {
    if (this.running) return

    if (!this.canvas.isConnected) {
      this.createCanvas(this.target)
    }

    this.running = true
    this.resize.subscribe()
    this.mouse.subscribe()
    this.raf.start()
  }

  /**
   * 
   * Stops a program
   * @param {boolean} dispose - If dispose = True, then remove canvas 
   */
  stop(dispose = false): void {
    if (!this.running) return

    this.running = false
    this.resize.unsubscribe()
    this.mouse.unsubscribe()
    this.raf.stop()
    this.clear()

    if (dispose) {
      this.canvas.remove()
    }
  }

  /**
   * 
   * Waiting for the stop function
   * @param {boolean} dispose - If dispose = True, then remove canvas 
   * @returns {Promise<void>}
   */
  async waitStop(dispose?: boolean): Promise<void> {
    if (!this.running) return

    return new Promise<void>((resolve) => {
      this.waitStopRaf = () => {
        if (!this.waitStopRaf) return
        requestAnimationFrame(this.waitStopRaf)
        if (!this.traces.length && !this.explosions.length) {
          this.waitStopRaf = null
          this.stop(dispose)
          resolve()
        }
      }

      this.waitStopRaf()
    })
  }

  /**
    * 
    * Pause program running
    */
  pause(): void {
    this.running = !this.running
    if (this.running) {
      this.raf.start()
    } else {
      this.raf.stop()
    }
  }


  /**
   * 
   * Delete all fireworks and particles
   */
  clear(): void {
    if (!this.ctx) return

    this.traces = []
    this.explosions = []
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  /**
   * 
   * Updates options when changing 
   */
  updateOptions(options: FireworksOptions): void {
    opts.updateOptions(options)
  }

 /**
  * 
  * Update canvas size when changing
  * @param {number} width - Client`s container width
  * @param {number} height - Client`s container height
  */
  updateSize({
    width = this.container.clientWidth,
    height = this.container.clientHeight
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

  /**
   * 
   * Update boundaries when changing
   */
  updateBoundaries(boundaries: Partial<IBoundaries>): void {
    this.updateOptions({ boundaries })
  }

  private createCanvas(el: Element | HTMLCanvasElement): void {
    if (el instanceof HTMLCanvasElement) {
      if (!el.isConnected) {
        document.body.append(el)
      }

      this.canvas = el
    } else {
      this.canvas = document.createElement('canvas')
      this.container.append(this.canvas)
    }

    this.ctx = this.canvas.getContext('2d')!
    this.updateSize()
  }

  private render(): void {
    if (!this.ctx || !this.running) return

    this.ctx.globalCompositeOperation = 'destination-out'
    this.ctx.fillStyle = `rgba(0, 0, 0, ${opts.opacity})`
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.ctx.globalCompositeOperation = 'lighter'
    this.ctx.lineCap = opts.lineStyle
    this.ctx.lineJoin = 'round'

    this.initTrace()
    this.drawTrace()
    this.drawExplosion()
  }

  private initTrace(): void {
    if (this.waitStopRaf) return

    const {
      hue,
      delay,
      rocketsPoint,
      boundaries,
      traceLength,
      traceSpeed,
      acceleration,
      mouse
    } = opts

    if (
      this.raf.tick > randomInt(delay.min, delay.max) ||
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
          traceLength: floor(traceLength)
        })
      )

      this.raf.tick = 0
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

    let particlesLength = floor(particles)
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
          explosionLength: floor(explosion),
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
