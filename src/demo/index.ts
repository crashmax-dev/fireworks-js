import { Fireworks } from '../fireworks'
import type { FireworksOptions } from '../fireworks'

const container = document.querySelector('.fireworks-container')!
const options: FireworksOptions = {}
const fireworks = new Fireworks(container, options)
fireworks.start()
