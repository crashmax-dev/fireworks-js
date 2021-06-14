import { Fireworks } from '../src/fireworks'

const container = document.querySelector('#container')
const fireworks = new Fireworks(container)

fireworks.pause()
fireworks.start()
fireworks.stop()
fireworks.clear()

console.log(fireworks.version)
console.log(fireworks.isRunning)