import { Fireworks } from 'fireworks-js'
import { el } from '@zero-dependency/dom'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!
const fireworks = new Fireworks(app)

const start = el(
  'button',
  {
    onclick: () => {
      fireworks.start()
    }
  },
  'Start'
)

const stop = el(
  'button',
  {
    onclick: () => {
      fireworks.waitStop()
    }
  },
  'Stop'
)

const launch = el(
  'button',
  {
    onclick: () => {
      fireworks.launch(Number(fires.value))
    }
  },
  'Launch'
)

const fires = el('input', {
  value: '1',
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
  launch,
  fires
)

document.body.appendChild(buttons)
