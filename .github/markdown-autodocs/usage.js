import { Fireworks } from 'fireworks-js'

const container = document.querySelector('.fireworks-container')
const fireworks = new Fireworks(container, { /* options */ })

fireworks.start()
fireworks.pause()
fireworks.clear()

// stop and clear fireworks
fireworks.stop()

// after initialization you can change the fireworks parameters
fireworks.setOptions({ delay: { min: 10, max: 15 }})