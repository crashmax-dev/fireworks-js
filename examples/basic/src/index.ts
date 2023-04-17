import { el } from '@zero-dependency/dom'
import { Fireworks } from 'fireworks-js'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!
const fireworks = new Fireworks(app, {
  autoresize: false,
  particles: 20,
  boundaries: {
    debug: true,
    x: 50,
    y: 50,
    width: app.clientWidth,
    height: app.clientHeight
  }
})

fireworks.start()

const start = el(
  'button',
  {
    onclick: () => fireworks.start()
  },
  'Start'
)

const stop = el(
  'button',
  {
    onclick: () => fireworks.waitStop()
  },
  'Stop'
)

const autoresize = el(
  'button',
  {
    onclick: () => toggleAutoresize()
  },
  `Autoresize: ${fireworks.currentOptions.autoresize}`
)

function toggleAutoresize() {
  const autoresizeValue = !fireworks.currentOptions.autoresize
  fireworks.updateOptions({ autoresize: autoresizeValue })
  autoresize.textContent = `Autoresize: ${autoresizeValue}`
  fireworks.stop()
  fireworks.start()
}

const launch = el(
  'button',
  {
    onclick: () => fireworks.launch(Number(count.value))
  },
  'Launch'
)

const count = el('input', {
  value: '1',
  min: '1',
  max: '15',
  type: 'number',
  placeholder: 'count',
  style: {
    width: '2rem'
  }
})

const buttons = el(
  'div',
  {
    style: {
      position: 'absolute',
      display: 'flex',
      gap: '4px'
    }
  },
  start,
  stop,
  autoresize,
  launch,
  count
)

document.body.appendChild(buttons)
