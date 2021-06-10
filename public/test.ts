import { Fireworks } from '../src/fireworks'

const BASE_PATH = 'https://crashmax-dev.github.io/fireworks-js/sounds/'

const container = document.querySelector('#fireworks-container')
// const container = document.getElementById('fireworks-container')

const fireworks = new Fireworks({
    target: container,
    hue: 120,
    startDelay: 1,
    minDelay: 20,
    maxDelay: 30,
    speed: 4,
    acceleration: 1.05,
    friction: 0.98,
    gravity: 1,
    particles: 75,
    trace: 3,
    explosion: 5,
    boundaries: {
        top: 50,
        bottom: container.clientHeight,
        left: 50,
        right: container.clientWidth
    },
    sound: {
        enable: true,
        list: [
            BASE_PATH + 'explosion0.mp3',
            BASE_PATH + 'explosion1.mp3',
            BASE_PATH + 'explosion2.mp3'
        ],
        min: 1,
        max: 1
    }
})

fireworks.start()
console.log(fireworks.version)

// fireworks.updateSize({
//     height: 100,
//     width: 300
// })

// fireworks.updateBoundaries({
//     top: 30,
//     left: 30,
//     bottom: 30,
//     right: 30
// })

// fireworks.stop()

// fireworks.pause()

// console.log(fireworks.isRunning)

// setTimeout(() => fireworks.stop(), 10 * 1000)