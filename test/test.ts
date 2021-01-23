import { Fireworks } from '../dist/fireworks'

const container = document.querySelector('#fireworks-container')
//const container = document.getElementById('fireworks-container')

const fireworks = new Fireworks({
    target: container
})

fireworks.start()

fireworks.setSize(1000, 500)

setTimeout(() => fireworks.clear(), 10 * 1000)

fireworks.stop()