import { opts } from './options.js'

export class Mouse {
  public active = false
  public x: number
  public y: number

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.pointerDown = this.pointerDown.bind(this)
    this.pointerUp = this.pointerUp.bind(this)
    this.pointerMove = this.pointerMove.bind(this)
  }

  subscribe(): void {
    this.canvas.addEventListener('pointerdown', this.pointerDown)
    this.canvas.addEventListener('pointerup', this.pointerUp)
    this.canvas.addEventListener('pointermove', this.pointerMove)
  }

  unsubscribe(): void {
    this.canvas.removeEventListener('pointerdown', this.pointerDown)
    this.canvas.removeEventListener('pointerup', this.pointerUp)
    this.canvas.removeEventListener('pointermove', this.pointerMove)
  }

  private usePointer(event: PointerEvent, active: boolean): void {
    if (opts.mouse.click || opts.mouse.move) {
      this.x = event.pageX - this.canvas.offsetLeft
      this.y = event.pageY - this.canvas.offsetTop
      this.active = active
    }
  }

  private pointerDown(event: PointerEvent): void {
    this.usePointer(event, opts.mouse.click)
  }

  private pointerUp(event: PointerEvent): void {
    this.usePointer(event, false)
  }

  private pointerMove(event: PointerEvent): void {
    this.usePointer(event, this.active)
  }
}
