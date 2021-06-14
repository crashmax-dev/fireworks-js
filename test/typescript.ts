import { Fireworks } from '../src/fireworks'

const container = document.querySelector('#container')

const options = {
  hue: {
    min: 0,
    max: 180
  }
}

const fireworks = new Fireworks(container, options)

fireworks.pause()
fireworks.start()
fireworks.stop()
fireworks.clear()

console.log(fireworks.version)
console.log(fireworks.isRunning)