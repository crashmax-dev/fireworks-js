let fireworksContainer = document.querySelector('.fireworks-container'),
    versionContainer = document.querySelector('.container > span')

/**
 * fireworks
 */
const fireworksConfig = {
    target: fireworksContainer,
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
        bottom: fireworksContainer.clientHeight,
        left: 50,
        right: fireworksContainer.clientWidth
    },
    sound: {
        enable: false,
        list: [
            document.location.href + 'explosion0.mp3',
            document.location.href + 'explosion1.mp3',
            document.location.href + 'explosion2.mp3'
        ],
        min: 4,
        max: 8
    }
}

const backgroundConfig = {
    backgroundColor: '#111111',
    backgroundImage: '',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repear',
    container: false,
    fps: false,
}

const fireworks = new Fireworks(fireworksConfig)

fireworks.start()

versionContainer.textContent = 'v' + fireworks._version

/**
 * stats.js
 */
let count_fireworks = document.querySelector('.count-fireworks'),
    count_particles = document.querySelector('.count-particles'),
    update,
    stats

stats = new Stats
stats.setMode(0)
stats.domElement.style.position = 'fixed'
stats.domElement.style.left = '5px'
stats.domElement.style.top = '5px'
stats.domElement.id = 'stats'
document.body.appendChild(stats.domElement)

update = function () {
    stats.begin()
    stats.end()
    count_particles.textContent = fireworks._particles.length
    count_fireworks.textContent = fireworks._fireworks.length
    requestAnimationFrame(update)
}

requestAnimationFrame(update)

/**
 * dat.gui.js
 */
let fpsMonitor = document.querySelector('#stats'),
    fireworksCounters = document.querySelector('.fireworks-counters'),
    container = document.querySelector('.container')


const gui = new dat.GUI({
    width: 300
})

window.export = () => {
    let blob = new Blob([JSON.stringify(fireworksConfig, void 0, 4)], { type: 'text/plain' })
    let a = document.createElement('a')

    Object.assign(a, {
        href: URL.createObjectURL(blob),
        download: 'fireworks-config.json'
    })

    a.click()
    a.remove()
}

folders = {
    fireworks: gui.addFolder('fireworks'),
    boundaries: gui.addFolder('boundaries'),
    sound: gui.addFolder('sound'),
    background: gui.addFolder('background'),
}

// fireworks
folders.fireworks.add(fireworksConfig, 'hue', 0, 345).step(1).onChange(value => {
    fireworks._hue = value
    gui.autoPlace = false
})

folders.fireworks.add(fireworksConfig, 'startDelay', 1, 100).step(1).onChange(value => {
    fireworks._startDelay = value
})

folders.fireworks.add(fireworksConfig, 'minDelay', 1, 100).step(1).onChange(value => {
    fireworks._minDelay = value
})

folders.fireworks.add(fireworksConfig, 'maxDelay', 1, 100).step(1).onChange(value => {
    fireworks._maxDelay = value
})

folders.fireworks.add(fireworksConfig, 'speed', 1, 100).step(1).onChange(value => {
    fireworks._speed = value
})

folders.fireworks.add(fireworksConfig, 'acceleration', 1, 10).step(0.1).onChange(value => {
    fireworks._acceleration = value
})

folders.fireworks.add(fireworksConfig, 'friction', 0.5, 3).step(0.01).onChange(value => {
    fireworks._friction = value
})

folders.fireworks.add(fireworksConfig, 'gravity', 0.1, 10).step(0.1).onChange(value => {
    fireworks._gravity = value
})

folders.fireworks.add(fireworksConfig, 'particles', 1, 1000).step(1).onChange(value => {
    fireworks._particleCount = value
})

folders.fireworks.add(fireworksConfig, 'trace', 1, 10).step(1).onChange(value => {
    fireworks._traceLength = value
})

folders.fireworks.add(fireworksConfig, 'explosion', 1, 10).step(1).onChange(value => {
    fireworks._explosionLength = value
})

folders.fireworks.add(fireworks, '_running', true).name('enable').onChange(() => {
    fireworks.render()
})

folders.fireworks.add(window, 'export').name('export config (json)')

// boundaries
folders.boundaries.add(fireworksConfig.boundaries, 'top').onChange(value => {
    fireworks._boundaries.top = value
})

folders.boundaries.add(fireworksConfig.boundaries, 'bottom').onChange(value => {
    fireworks._boundaries.bottom = value
})

folders.boundaries.add(fireworksConfig.boundaries, 'left').onChange(value => {
    fireworks._boundaries.left = value
})

folders.boundaries.add(fireworksConfig.boundaries, 'right').onChange(value => {
    fireworks._boundaries.right = value
})

// sound
folders.sound.add(fireworksConfig.sound, 'enable', false).onChange(value => {
    fireworks._sound.enable = value
})

folders.sound.add(fireworksConfig.sound, 'min', 1, 10).step(1).onChange(value => {
    fireworks._sound.min = value
})

folders.sound.add(fireworksConfig.sound, 'max', 1, 10).step(1).onChange(value => {
    fireworks._sound.max = value
})

// background
folders.background.addColor(backgroundConfig, 'backgroundColor').name('background-color').onChange(value => {
    fireworksContainer.style.backgroundColor = value
})

folders.background.add(backgroundConfig, 'backgroundImage').name('background-image').onChange(value => {
    fireworksContainer.style.backgroundImage = `url(${value})`
})

folders.background.add(backgroundConfig, 'backgroundSize').name('background-size').onChange(value => {
    fireworksContainer.style.backgroundSize = value
})

folders.background.add(backgroundConfig, 'backgroundPosition').name('background-position').onChange(value => {
    fireworksContainer.style.backgroundPosition = value
})

folders.background.add(backgroundConfig, 'backgroundRepeat').name('background-repeat').onChange(value => {
    fireworksContainer.style.backgroundRepeat = value
})

folders.background.add(backgroundConfig, 'fps').name('hide fps').onChange(value => {
    if (value) {
        fpsMonitor.style.display = 'none'
        fireworksCounters.style.display = 'none'
    } else {
        fpsMonitor.style.display = 'block'
        fireworksCounters.style.display = 'block'
    }
})

folders.background.add(backgroundConfig, 'container').name('hide panel').onChange(value => {
    if (value) {
        container.style.display = 'none'
    } else {
        container.style.display = 'block'
    }
})