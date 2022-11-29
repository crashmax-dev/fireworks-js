import type { Fireworks } from './fireworks.js'

export class Resize {
  constructor(private readonly fw: Fireworks) {
    this.handleResize = this.handleResize.bind(this)
  }

  subscribe(): void {
    if (this.fw.options.autoresize) {
      window.addEventListener('resize', this.handleResize)
    }
  }

  unsubscribe(): void {
    if (this.fw.options.autoresize) {
      window.removeEventListener('resize', this.handleResize)
    }
  }

  private handleResize(): void {
    this.fw.updateSize()
  }
}
