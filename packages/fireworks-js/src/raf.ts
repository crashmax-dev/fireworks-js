import { opts } from './options.js'

export class RequestAnimationFrame {
  public tick = 0

  private rafId = 0
  private fps = opts.fps
  private tolerance = 0.1
  private now: number

  constructor(private readonly render: () => void) {}

  start(): void {
    this.now = performance.now()
    const interval = 1000 / this.fps

    const raf = (timestamp: number) => {
      this.rafId = requestAnimationFrame(raf)
      const delta = timestamp - this.now

      if (delta >= interval - this.tolerance) {
        this.render()
        this.now = timestamp - (delta % interval)
        this.tick += (delta * (opts.intensity * Math.PI)) / 1000
      }
    }

    this.rafId = requestAnimationFrame(raf)
  }

  stop() {
    cancelAnimationFrame(this.rafId)
  }
}
