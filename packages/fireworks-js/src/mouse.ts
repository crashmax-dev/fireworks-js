import type { Options } from './options.js'

export class Mouse {
  active = false
  x: number
  y: number

  constructor(
    private readonly options: Options,
    private readonly canvas: HTMLCanvasElement
  ) {
    this.pointerDown = this.pointerDown.bind(this)
    this.pointerUp = this.pointerUp.bind(this)
    this.pointerMove = this.pointerMove.bind(this)
  }

  private get mouseOptions() {
    return this.options.mouse
  }

  mount(): void {
    this.canvas.addEventListener('pointerdown', this.pointerDown)
    this.canvas.addEventListener('pointerup', this.pointerUp)
    this.canvas.addEventListener('pointermove', this.pointerMove)
  }

  unmount(): void {
    this.canvas.removeEventListener('pointerdown', this.pointerDown)
    this.canvas.removeEventListener('pointerup', this.pointerUp)
    this.canvas.removeEventListener('pointermove', this.pointerMove)
  }

  private usePointer(event: PointerEvent, active: boolean): void {
    const { click, move } = this.mouseOptions
    if (click || move) {
      this.x = event.pageX - this.canvas.offsetLeft
      this.y = event.pageY - this.canvas.offsetTop
      this.active = active
    }
  }

  private pointerDown(event: PointerEvent): void {
    this.usePointer(event, this.mouseOptions.click)
  }

  private pointerUp(event: PointerEvent): void {
    this.usePointer(event, false)
  }

  private pointerMove(event: PointerEvent): void {
    this.usePointer(event, this.active)
  }
}
