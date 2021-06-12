const fireworksContainer = document.querySelector('.fireworks-container'),
  versionContainer = document.querySelector('.container > span')

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
  speed: 10,
  acceleration: 1.2,
  friction: 0.96,
  gravity: 1,
  particles: 90,
  trace: 3,
  explosion: 6,
  autoresize: true,
  boundaries: {
    top: 50,
    bottom: fireworksContainer.clientHeight,
    left: 50,
    right: fireworksContainer.clientWidth
  },
  sound: {
    enable: false,
    files: [
      document.location.origin + document.location.pathname + '/sounds/explosion0.mp3',
      document.location.origin + document.location.pathname + '/sounds/explosion1.mp3',
      document.location.origin + document.location.pathname + '/sounds/explosion2.mp3'
    ],
    min: 1,
    max: 2
  },
  mouse: {
    click: true,
    move: false,
    max: 3
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
    const c = b64DecodeUnicode(hash).split(',')
      .map(Number)
      .filter(v => typeof v === 'number')

    if (c.length === 11) {
      fireworksConfig.hue.min = c[0]
      fireworksConfig.hue.max = c[1]
      fireworksConfig.delay.min = c[2]
      fireworksConfig.delay.max = c[3]
      fireworksConfig.speed = c[4]
      fireworksConfig.acceleration = c[5]
      fireworksConfig.friction = c[6]
      fireworksConfig.gravity = c[7]
      fireworksConfig.particles = c[8]
      fireworksConfig.trace = c[9]
      fireworksConfig.explosion = c[10]
    }
  } catch (err) {
    document.location.hash = ''
    console.log(err)
  }
}

const fireworks = new Fireworks(fireworksContainer, fireworksConfig)

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
  const shareOptions = Object.values(fireworksConfig)
    .map((v, i) => {
      switch (i) {
        case 0:
        case 1:
        case 9:
        case 10:
        case 11:
        case 12:
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
  background: gui.addFolder('background'),
}

// fireworks
folders.fireworks.addFolder('hue')

folders.fireworks.__folders.hue.add(fireworksConfig.hue, 'min', 0, 360).step(1).onChange(value => {
  fireworks._hue[0] = value
})

folders.fireworks.__folders.hue.add(fireworksConfig.hue, 'max', 0, 360).step(1).onChange(value => {
  fireworks._hue[1] = value
})

folders.fireworks.addFolder('delay')

folders.fireworks.__folders.delay.add(fireworksConfig.delay, 'min', 1, 100).step(1).onChange(value => {
  fireworks._delay.min = value
})

folders.fireworks.__folders.delay.add(fireworksConfig.delay, 'max', 1, 100).step(1).onChange(value => {
  fireworks._delay.max = value
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

folders.fireworks.add(window, 'export').name('export config (download json)')
folders.fireworks.add(window, 'share').name('share config (copy url)')

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

// mouse
folders.mouse.addFolder('click')
folders.mouse.__folders.click.add(fireworksConfig.mouse, 'click', true).onChange(value => {
  fireworks._mouse.click = value
})

folders.mouse.__folders.click.add(fireworksConfig.mouse, 'max', 1, 10).step(1).onChange(value => {
  fireworks._mouse.max = value
})

folders.mouse.add(fireworksConfig.mouse, 'move', false).onChange(value => {
  fireworks._mouse.move = value
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

// костыль
document.querySelectorAll('.property-name')[21].textContent = 'enable'