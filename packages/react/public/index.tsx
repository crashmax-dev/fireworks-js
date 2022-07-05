import type { FireworksOptions } from 'fireworks-js'
import type { CSSProperties } from 'react'
import { createRoot } from 'react-dom/client'
import { Fireworks } from '../src/index.js'

const app = document.getElementById('app')!
const root = createRoot(app)

const options: FireworksOptions = {
  flickering: 100,
  delay: {
    min: 10,
    max: 100
  }
}

const style: CSSProperties = {
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  background: '#000000'
}

root.render(
  <Fireworks
    options={options}
    style={style}
  />
)
