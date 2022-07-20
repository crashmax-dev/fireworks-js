import { Fireworks as FireworksJs } from 'fireworks-js'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ref, createRef } from 'lit/directives/ref.js'
import type { Ref } from 'lit/directives/ref.js'
import type { FireworksOptions } from 'fireworks-js'

type FireworksProperties = Omit<FireworksOptions, 'autoresize'>

@customElement('fireworks-js')
class Fireworks extends LitElement {
  private container: Ref<HTMLDivElement> = createRef()
  private fireworks: FireworksJs | undefined
  private resizeObserver: ResizeObserver | undefined

  @property({ type: Object })
  options?: FireworksProperties

  @property({ type: Boolean, attribute: true })
  running?: boolean = false

  start(): void {
    this.fireworks?.start()
  }

  stop(): void {
    this.fireworks?.stop()
  }

  pause(): void {
    this.fireworks?.pause()
  }

  clear(): void {
    this.fireworks?.clear()
  }

  firstUpdated(): void {
    this.fireworks = new FireworksJs(
      this.container.value!,
      { ...this.options, autoresize: false }
    )

    if (this.running) {
      this.start()
    }

    this.resizeObserver = new ResizeObserver(([el]) => {
      const { height, width } = el.contentRect
      this.fireworks!.updateSize({ width, height })
    })
    this.resizeObserver.observe(this)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.stop()
    this.resizeObserver!.unobserve(this)
  }

  render() {
    return html`
      <div
        ${ref(this.container)}
        style="${Fireworks.styles}"
      ></div>
    `
  }

  protected createRenderRoot() {
    return this
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fireworks-js': Fireworks
  }
}

export { Fireworks }
export default Fireworks
export type { FireworksProperties }
