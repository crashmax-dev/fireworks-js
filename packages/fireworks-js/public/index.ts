import Fireworks from '../src/index.js'
import type { FireworksOptions } from '../src/index.js'

const app = document.querySelector('#app')!
const options: FireworksOptions = {
  mouse: {
    click: true,
    max: 10
  }
}
const fireworks = new Fireworks(app, options)
fireworks.start()
