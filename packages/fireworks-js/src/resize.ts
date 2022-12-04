import type { Options } from './options.js'

export class Resize {
  constructor(
    private readonly options: Options,
    private readonly updateSize: () => void
  ) {
    this.handleResize = this.handleResize.bind(this)
  }

  mount(): void {
    if (this.options.autoresize) {
      window.addEventListener('resize', this.handleResize)
    }
  }

  unmount(): void {
    if (this.options.autoresize) {
      window.removeEventListener('resize', this.handleResize)
    }
  }

  private handleResize(): void {
    this.updateSize()
  }
}
