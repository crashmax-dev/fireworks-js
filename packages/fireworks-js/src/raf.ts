import type { Options } from './options.js'

export class RequestAnimationFrame {
  tick = 0

  private rafId = 0
  private fps = 60
  private tolerance = 0.1
  private now: number

  constructor(
    private readonly options: Options,
    private readonly render: () => void
  ) {}

  mount(): void {
    this.now = performance.now()
    const interval = 1000 / this.fps

    const raf = (timestamp: number) => {
      this.rafId = requestAnimationFrame(raf)
      const delta = timestamp - this.now

      if (delta >= interval - this.tolerance) {
        this.render()
        this.now = timestamp - (delta % interval)
        this.tick += (delta * (this.options.intensity * Math.PI)) / 1000
      }
    }

    this.rafId = requestAnimationFrame(raf)
  }

  unmount() {
    cancelAnimationFrame(this.rafId)
  }
}
