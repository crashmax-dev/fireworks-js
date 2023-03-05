import { Fireworks as FireworksJs } from 'fireworks-js'
import type { FireworksOptions } from 'fireworks-js'

class Fireworks extends HTMLElement {
  fireworks: FireworksJs
  private options: FireworksOptions = {}

  static get observedAttributes() {
    return ['options', 'style']
  }

  constructor() {
    super()

    const shadowRoot = this.attachShadow({ mode: 'open' })
    const div = document.createElement('div')
    const style = document.createElement('style')
    shadowRoot.append(style, div)

    this.attributeChangedCallback()
  }

  connectedCallback(): void {
    if (!this.isConnected) return

    const container = this.shadowRoot!.querySelector('div')
    if (!this.fireworks && container) {
      this.fireworks = new FireworksJs(container, this.options)
      this.fireworks.start()
    }
  }

  disconnectedCallback(): void {
    this.fireworks.stop()
  }

  attributeChangedCallback() {
    const options = this.getAttribute('options')
    if (options) {
      try {
        this.options = JSON.parse(options)
        this.fireworks?.updateOptions(this.options)
      } catch (err) {
        console.error('Attribute `options` failed parsed:', err)
      }
    }

    const style = this.getAttribute('style')
    if (style) {
      this.shadowRoot!.querySelector('style')!.textContent = `div { ${style} }`
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fireworks-js': Fireworks
  }
}

customElements.define('fireworks-js', Fireworks)

export { Fireworks }
export default Fireworks
export type { FireworksOptions }
