import { Fireworks } from 'fireworks-js'

const container = document.querySelector('.fireworks-container')
const fireworks = new Fireworks(container, { /* options */ })

fireworks.start()
fireworks.pause()
fireworks.clear()

// stop and clear fireworks
fireworks.stop()

// changing the container canvas size (used on constructor)
fireworks.setSize({ height: 500, width: 500 })

// after initialization you can change the fireworks parameters
fireworks.setOptions('delay', { min: 10, max: 15 })

// show/hide border firework boundaries
fireworks.visibleBoudaries()

// changing the boundaries of fireworks (used on constructor)
fireworks.setBoudaries()