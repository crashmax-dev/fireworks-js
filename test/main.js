let canvasFireworks = document.querySelector('#fireworks'),
    containerVersion = document.querySelector('.container > span')

canvasFireworks.setAttribute('width', window.screen.availWidth)
canvasFireworks.setAttribute('height', window.screen.availHeight)

const fireworksConfig = {
    id: 'fireworks',
    hue: 120,
    startDelay: 1,
    minDelay: 20,
    maxDelay: 30,
    speed: 4,
    acceleration: 1.05,
    friction: 0.98,
    gravity: 1,
    particles: 75,
    boundaries: {
        top: 50,
        bottom: canvasFireworks.height * 0.5,
        left: 50,
        right: canvasFireworks.width - 50
    },
    sound: {
        enable: false,
        min: 4,
        max: 8
    }
}

const backgroundConfig = {
    color: '#111111',
    container: false,
    fps: false,
}

const fireworks = new Fireworks(fireworksConfig)

fireworks.start()

// version
containerVersion.textContent = 'v' + fireworks._version

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
    autoPlace: true,
    closed: false,
    width: 260
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
folders.background.addColor(backgroundConfig, 'color').name('background-color').onChange(value => {
    canvasFireworks.style.backgroundColor = value
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