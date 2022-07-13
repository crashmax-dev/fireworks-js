import { opts } from './options.js'

export class Mouse {
  public active = false
  public x: number
  public y: number

  constructor(private readonly canvas: HTMLCanvasElement) {}

  subscribe(): void {
    this.canvas.addEventListener('mousedown', (event) => this.mouseDown(event))
    this.canvas.addEventListener('mouseup', (event) => this.mouseUp(event))
    this.canvas.addEventListener('mousemove', (event) => this.mouseMove(event))
  }

  unsubscribe(): void {
    this.canvas.removeEventListener('mousedown', this.mouseDown)
    this.canvas.removeEventListener('mouseup', this.mouseUp)
    this.canvas.removeEventListener('mousemove', this.mouseMove)
  }

  private useMouse(event: MouseEvent, active: boolean): void {
    if (opts.mouse.click || opts.mouse.move) {
      this.x = event.pageX - this.canvas.offsetLeft
      this.y = event.pageY - this.canvas.offsetTop
      this.active = active
    }
  }

  private mouseDown(event: MouseEvent): void {
    this.useMouse(event, opts.mouse.click)
  }

  private mouseUp(event: MouseEvent): void {
    this.useMouse(event, false)
  }

  private mouseMove(event: MouseEvent): void {
    this.useMouse(event, this.active)
  }
}
