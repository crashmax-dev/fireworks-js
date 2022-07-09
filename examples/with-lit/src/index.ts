import '@fireworks-js/lit'
import type { Fireworks } from '@fireworks-js/lit'
import './style.css'

const fireworks = document.querySelector<Fireworks>('fireworks-js')!
fireworks.options = { opacity: 0.5 }
// fireworks.start()
