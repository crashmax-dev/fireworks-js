import type { Fireworks } from './index.js'
import { opts } from './options.js'

export class Resize {
  constructor(private readonly fireworks: Fireworks) {}

  subscribe(): void {
    if (opts.autoresize) {
      window.addEventListener('resize', () => this.bindResize())
    }
  }

  unsubscribe(): void {
    if (opts.autoresize) {
      window.removeEventListener('resize', this.bindResize)
    }
  }

  private bindResize(): void {
    this.fireworks.updateSize()
  }
}
