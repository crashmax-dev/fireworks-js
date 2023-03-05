import { el } from '@zero-dependency/dom'
import { Fireworks } from 'fireworks-js'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!
const fireworks = new Fireworks(app, {
  autoresize: true,
  boundaries: {
    width: app.clientWidth,
    height: app.clientHeight
  }
})

// const resizeObserver = new ResizeObserver((entries) => {
//   console.log(entries)
// })

// resizeObserver.observe(app)

fireworks.start()

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
      fireworks.launch(Number(count.value))
    }
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
  launch,
  count
)

document.body.appendChild(buttons)
