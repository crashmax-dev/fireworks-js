import { Fireworks } from 'fireworks-js'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!
const fireworks = new Fireworks(app)

const button = document.createElement('button')
button.textContent = 'Start'
button.style.position = 'absolute'
button.style.zIndex = '999'
button.addEventListener('click', () => {
  fireworks.start()
  stopFireworks(fireworks)
})

document.body.appendChild(button)

async function stopFireworks(fireworks: Fireworks) {
  console.time()
  await new Promise((resolve) => setTimeout(resolve, 2000))
  await fireworks.waitStop()
  console.timeEnd()
}
