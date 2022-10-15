import type { FireworksOptions } from 'fireworks-js'

export const mainContainer =
  document.querySelector<HTMLDivElement>('.container')!

export const fireworksContainer = document.querySelector<HTMLDivElement>(
  '.fireworks-container'
)!

export const fireworksOptions: FireworksOptions = {
  hue: {
    min: 0,
    max: 345
  },
  delay: {
    min: 30,
    max: 60
  },
  rocketsPoint: {
    min: 50,
    max: 50
  },
  opacity: 0.5, // fillStyle
  acceleration: 1.02,
  friction: 0.97,
  gravity: 1.5,
  particles: 60,
  traceLength: 3,
  traceSpeed: 10,
  explosion: 5,
  intensity: 30,
  flickering: 50,
  lineStyle: 'round',
  lineWidth: {
    explosion: {
      min: 1,
      max: 4
    },
    trace: {
      min: 0.1,
      max: 1
    }
  },
  brightness: {
    min: 50,
    max: 80
  },
  decay: {
    min: 0.015,
    max: 0.03
  },
  boundaries: {
    x: 50,
    y: 50,
    width: fireworksContainer.clientWidth,
    height: fireworksContainer.clientHeight
  },
  sound: {
    enabled: false,
    files: [
      location.href + 'sounds/explosion0.mp3',
      location.href + 'sounds/explosion1.mp3',
      location.href + 'sounds/explosion2.mp3'
    ],
    volume: {
      min: 2,
      max: 4
    }
  },
  mouse: {
    click: true,
    move: false,
    max: 1
  }
}

export const backgroundConfig = {
  color: '#000000',
  image: '',
  size: 'cover',
  position: '50% 50%',
  repeat: 'no-repeat',
  container: false,
  fps: false
}
