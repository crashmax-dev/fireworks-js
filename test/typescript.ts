import { Fireworks, FireworksOptions } from '../src/fireworks'

const container = document.querySelector('#container')

const options: FireworksOptions = {
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

fireworks.setSize({ height: 500, width: 500 })
fireworks.setOptions('sound', { enable: true })
fireworks.setOptions('delay', { min: 10, max: 15 })
fireworks.setOptions('speed', 10)

console.log(fireworks.version)
console.log(fireworks.isRunning)