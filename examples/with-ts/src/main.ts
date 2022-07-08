import { Fireworks } from 'fireworks-js'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!
const fireworks = new Fireworks(app)
fireworks.start()
