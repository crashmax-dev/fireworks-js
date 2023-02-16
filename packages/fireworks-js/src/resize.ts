import { debounce } from './helpers.js'
import type { Options } from './options.js'

export class Resize {
  private resizer: ResizeObserver | undefined

  constructor(
    private readonly options: Options,
    private readonly updateSize: () => void,
    private readonly container: Element
  ) {}

  mount(): void {
    if (!this.resizer) {
      const debouncedResize = debounce(() => this.updateSize(), 100)
      this.resizer = new ResizeObserver(debouncedResize)
    }

    if (this.options.autoresize) {
      this.resizer.observe(this.container)
    }
  }

  unmount(): void {
    if (this.resizer) {
      this.resizer.unobserve(this.container)
    }
  }
}
