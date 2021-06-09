const fireworksContainer = document.querySelector('.fireworks-container'),
    versionContainer = document.querySelector('.container > span')

/**
 * fireworks
 */
const fireworksConfig = {
    target: fireworksContainer,
    hue: 120,
    startDelay: 1,
    minDelay: 14,
    maxDelay: 26,
    speed: 10,
    acceleration: 1.1,
    friction: 1,
    gravity: 1,
    particles: 90,
    trace: 3,
    explosion: 6,
    boundaries: {
        top: 50,
        bottom: fireworksContainer.clientHeight,
        left: 50,
        right: fireworksContainer.clientWidth
    },
    sound: {
        enable: false,
        list: [
            document.location.origin + '/explosion0.mp3',
            document.location.origin + '/explosion1.mp3',
            document.location.origin + '/explosion2.mp3'
        ],
        min: 4,
        max: 8
    }
}

const backgroundConfig = {
    backgroundColor: '#000000',
    backgroundImage: '',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    container: false,
    fps: false
}

document.addEventListener('keydown', e => {
    if (e.code === 'F11') {
        e.preventDefault()

        if (fireworksContainer.requestFullscreen) {
            fireworksContainer.requestFullscreen()
        } else if (fireworksContainer.webkitRequestFullscreen) {
            fireworksContainer.webkitRequestFullscreen()
        } else if (fireworksContainer.msRequestFullscreen) {
            fireworksContainer.msRequestFullscreen()
        }
    }
})

if (document.location.hash) {
    try {
        const hash = document.location.hash.slice(1)
        const code = b64DecodeUnicode(hash).split(',').map(Number)

        if (code.length === 12) {
            Object.values(code).forEach((v, i) => {
                switch (i) {
                    case 0: fireworksConfig.hue = v; break
                    case 1: fireworksConfig.startDelay = v; break
                    case 2: fireworksConfig.minDelay = v; break
                    case 3: fireworksConfig.maxDelay = v; break
                    case 4: fireworksConfig.speed = v; break
                    case 5: fireworksConfig.acceleration = v; break
                    case 6: fireworksConfig.friction = v; break
                    case 7: fireworksConfig.gravity = v; break
                    case 8: fireworksConfig.particles = v; break
                    case 9: fireworksConfig.trace = v; break
                    case 10: fireworksConfig.explosion = v; break
                    case 11: fireworksConfig.sound.enable = Boolean(v)
                }
            })
        }
    } catch (err) {
        document.location.hash = ''
        console.log(err)
    }
}

const fireworks = new Fireworks(fireworksConfig)

fireworks.start()

versionContainer.textContent = 'v' + fireworks.version

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
const fpsMonitor = document.querySelector('#stats'),
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

/**
 * base64 encode/decode
 */
function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1)
        }))
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}

/**
 * share fireworks options
 */
window.share = () => {
    const shareOptions = Object.values(fireworksConfig).map((v, i) => {
        switch (i) {
            case 0:
            case 12:
                break
            case 13:
                return Number(v.enable)
            default:
                return v
        }
    }).filter(v => v !== undefined)

    document.location.hash = '#' + b64EncodeUnicode(shareOptions)

    const i = document.createElement('input')
    document.body.appendChild(i)
    i.value = document.location.href
    i.select()
    document.execCommand('copy')
    document.body.removeChild(i)
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
folders.fireworks.add(window, 'share').name('share config (url)')

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

folders.background.add(backgroundConfig, 'container').name('hide card').onChange(value => {
    if (value) {
        container.style.display = 'none'
    } else {
        container.style.display = 'block'
    }
})