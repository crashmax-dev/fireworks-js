import type { IMouse } from './types.js'

export class Mouse {
  private el: HTMLElement
  private mouse: IMouse

  hasMove = false
  cursorX: number
  cursorY: number

  constructor(el: HTMLElement, mouse: IMouse) {
    this.el = el
    this.mouse = mouse
  }

  subscribeListeners(): void {
    this.el.addEventListener('mousedown', (event) => this.mouseDown(event))
    this.el.addEventListener('mouseup', (event) => this.mouseUp(event))
    this.el.addEventListener('mousemove', (event) => this.mouseMove(event))
  }

  unsubscribeListeners(): void {
    this.el.removeEventListener('mousedown', this.mouseDown)
    this.el.removeEventListener('mouseup', this.mouseUp)
    this.el.removeEventListener('mousemove', this.mouseMove)
  }

  private useMouse(event: MouseEvent, hasMove: boolean): void {
    if (this.mouse.click || this.mouse.move) {
      this.cursorX = event.pageX - this.el.offsetLeft
      this.cursorY = event.pageY - this.el.offsetTop
      this.hasMove = hasMove
    }
  }

  private mouseDown(event: MouseEvent): void {
    this.useMouse(event, this.mouse.click!)
  }

  private mouseUp(event: MouseEvent): void {
    this.useMouse(event, false)
  }

  private mouseMove(event: MouseEvent): void {
    this.useMouse(event, this.hasMove)
  }
}
