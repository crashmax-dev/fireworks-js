import { Fireworks } from '../src/index.js'

const app = document.querySelector('#app')
if (app) {
  const fireworks = new Fireworks(app, {
    mouse: {
      click: true,
      max: 10
    }
  })
  fireworks.start()
  console.log(fireworks)
}
