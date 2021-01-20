let canvasFireworks = document.querySelector('#fireworks')
containerVersion = document.querySelector('.container > span')

canvasFireworks.setAttribute('width', window.screen.availWidth)
canvasFireworks.setAttribute('height', window.screen.availHeight)

const fireworksConfig = {
    id: 'fireworks',
    hue: 70,
    delay: 1,
    minDelay: 15,
    maxDelay: 20,
    fireworkSpeed: 3,
    fireworkAcceleration: 1.05,
    particleFriction: 0.97,
    particleGravity: 1,
    particleCount: 85,
    sounds: false
}

const fireworks = new Fireworks(fireworksConfig)

containerVersion.textContent = 'v' + fireworks._version
fireworks.start()

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