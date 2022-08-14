import type { Fireworks } from './index.js'
import { opts } from './options.js'

export class Resize {
  constructor(private readonly fireworks: Fireworks) {
    this.handleResize = this.handleResize.bind(this)
  }

  subscribe(): void {
    if (opts.autoresize) {
      window.addEventListener('resize', this.handleResize)
    }
  }

  unsubscribe(): void {
    if (opts.autoresize) {
      window.removeEventListener('resize', this.handleResize)
    }
  }

  private handleResize(): void {
    this.fireworks.updateSize()
  }
}
