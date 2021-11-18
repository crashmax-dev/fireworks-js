const fireworksContainer = document.querySelector('.fireworks-container')

/**
 * fireworks
 */
const fireworksConfig = {
  hue: {
    min: 0,
    max: 345
  },
  delay: {
    min: 15,
    max: 15
  },
  rocketsPoint: 50, // center
  opacity: 0.5, // fillStyle
  speed: 10,
  acceleration: 1.2,
  friction: 0.97,
  gravity: 1.5,
  particles: 90,
  trace: 3,
  explosion: 6,
  autoresize: true,
  brightness: {
    min: 50,
    max: 80,
    decay: {
      min: 0.015,
      max: 0.03
    }
  },
  boundaries: {
    x: 50,
    y: 50,
    width: fireworksContainer.clientWidth,
    height: fireworksContainer.clientHeight,
    visible: false
  },
  sound: {
    enabled: false,
    files: [
      document.location.origin + document.location.pathname + 'sounds/explosion0.mp3',
      document.location.origin + document.location.pathname + 'sounds/explosion1.mp3',
      document.location.origin + document.location.pathname + 'sounds/explosion2.mp3'
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
    }
  }
})

if (document.location.hash) {
  try {
    const hash = document.location.hash.slice(1)
    const c = b64DecodeUnicode(hash).split(',')
      .map(Number)
      .filter(v => typeof v === 'number')

    if (c.length === 17) {
      fireworksConfig.hue.min = c[0]
      fireworksConfig.hue.max = c[1]
      fireworksConfig.delay.min = c[2]
      fireworksConfig.delay.max = c[3]
      fireworksConfig.brightness.min = c[4]
      fireworksConfig.brightness.max = c[5]
      fireworksConfig.brightness.decay.min = c[6]
      fireworksConfig.brightness.decay.max = c[7]
      fireworksConfig.rocketsPoint = c[8]
      fireworksConfig.opacity = c[9]
      fireworksConfig.speed = c[10]
      fireworksConfig.acceleration = c[11]
      fireworksConfig.friction = c[12]
      fireworksConfig.gravity = c[13]
      fireworksConfig.particles = c[14]
      fireworksConfig.trace = c[15]
      fireworksConfig.explosion = c[16]
    } else {
      throw Error()
    }
  } catch (err) {
    history.pushState(null, '', '/')
  }
}

const fireworks = new Fireworks(fireworksContainer, fireworksConfig)
fireworks.start()

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
  count_fireworks.textContent = fireworks._traces.length
  count_particles.textContent = fireworks._explosions.length
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
  closed: true,
  autoPlace: true,
  width: window.outerWidth > 360 ? 320 : 260
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
  const shareOptions = Object.values(fireworksConfig)
    .map((v, i) => {
      switch (i) {
        case 0:
        case 1:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
          break
        default:
          return v
      }
    })
    .filter(v => v !== undefined)

  document.location.hash = '#' + b64EncodeUnicode([
    fireworksConfig.hue.min,
    fireworksConfig.hue.max,
    fireworksConfig.delay.min,
    fireworksConfig.delay.max,
    fireworksConfig.brightness.min,
    fireworksConfig.brightness.max,
    fireworksConfig.brightness.decay.min,
    fireworksConfig.brightness.decay.max,
    ...shareOptions
  ])

  const i = document.createElement('input')
  document.body.appendChild(i)
  i.value = document.location.href
  i.select()
  document.execCommand('copy')
  document.body.removeChild(i)
}

const folders = {
  fireworks: gui.addFolder('fireworks'),
  boundaries: gui.addFolder('boundaries'),
  sound: gui.addFolder('sound'),
  mouse: gui.addFolder('mouse'),
  background: gui.addFolder('background')
}

// fireworks
folders.fireworks.addFolder('hue')
folders.fireworks.__folders.hue.add(fireworksConfig.hue, 'min', 0, 360).step(1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.fireworks.__folders.hue.add(fireworksConfig.hue, 'max', 0, 360).step(1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

// delay
folders.fireworks.addFolder('delay')
folders.fireworks.__folders.delay.add(fireworksConfig.delay, 'min', 1, 100).step(1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.fireworks.__folders.delay.add(fireworksConfig.delay, 'max', 1, 100).step(1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

// brightness
folders.fireworks.addFolder('brightness')

folders.fireworks.__folders.brightness.add(fireworksConfig.brightness, 'min', 1, 100).step(1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.fireworks.__folders.brightness.add(fireworksConfig.brightness, 'max', 1, 100).step(1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

// brightness -> decay
folders.fireworks.__folders.brightness.addFolder('decay')
folders.fireworks.__folders.brightness.__folders.decay.add(fireworksConfig.brightness.decay, 'min', 0.001, 0.05).step(0.001).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.fireworks.__folders.brightness.__folders.decay.add(fireworksConfig.brightness.decay, 'max', 0.001, 0.05).step(0.001).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.fireworks.add(fireworksConfig, 'rocketsPoint', 0, 100).step(1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.fireworks.add(fireworksConfig, 'opacity', 0.1, 1).step(0.1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.fireworks.add(fireworksConfig, 'speed', 1, 100).step(1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.fireworks.add(fireworksConfig, 'acceleration', 1, 10).step(0.1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.fireworks.add(fireworksConfig, 'friction', 0.5, 3).step(0.01).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.fireworks.add(fireworksConfig, 'gravity', 0.1, 10).step(0.1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.fireworks.add(fireworksConfig, 'particles', 1, 1000).step(1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.fireworks.add(fireworksConfig, 'trace', 1, 10).step(1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.fireworks.add(fireworksConfig, 'explosion', 1, 10).step(1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.fireworks.add(fireworks, '_experimentals', false).name('experimentals').onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.fireworks.add(fireworks, '_randomRocketsPoint', false).name('random flying start point').onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.fireworks.add(fireworks, '_running', true).name('enabled').onChange(() => {
  fireworks.render()
})

folders.fireworks.add(window, 'export').name('export config (download json)')
folders.fireworks.add(window, 'share').name('share config (copy url)')

// boundaries
folders.boundaries.add(fireworksConfig.boundaries, 'visible').onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.boundaries.add(fireworksConfig.boundaries, 'x').step(1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.boundaries.add(fireworksConfig.boundaries, 'y').step(1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.boundaries.add(fireworksConfig.boundaries, 'width').step(1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.boundaries.add(fireworksConfig.boundaries, 'height').step(1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

// sound -> volume
folders.sound.addFolder('volume')
folders.sound.__folders.volume.add(fireworksConfig.sound.volume, 'min', 1, 100).step(1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.sound.__folders.volume.add(fireworksConfig.sound.volume, 'max', 1, 100).step(1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.sound.add(fireworksConfig.sound, 'enabled', false).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

// mouse -> click
folders.mouse.addFolder('click')
folders.mouse.__folders.click.add(fireworksConfig.mouse, 'click', true).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.mouse.__folders.click.add(fireworksConfig.mouse, 'max', 1, 10).step(1).onChange(() => {
  fireworks.setOptions(fireworksConfig)
})

folders.mouse.add(fireworksConfig.mouse, 'move', false).onChange(() => {
  fireworks.setOptions(fireworksConfig)
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