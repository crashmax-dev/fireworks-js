<br/>
<p align="center">
    <img src="test/fireworks_emoji.png" />
</p>

<p align="center"><b>Fireworks.js</b></p>

<p align="center">
    A simple fireworks library!
</p>
<br/>

<p align="center">
    <a href="https://travis-ci.org/github/crashmax-off/fireworks-js" target="_blank"><img alt="Travis (.org)" src="https://img.shields.io/travis/crashmax-off/fireworks-js"></a>
    <a href="https://www.npmjs.com/package/fireworks-js" target="_blank"><img alt="npm" src="https://img.shields.io/npm/v/fireworks-js"></a>
    <a href="#"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/fireworks-js"></a>
</p>

## Installation

install with npm:

```
$ npm install fireworks-js --save
```

or with yarn:

```
$ yarn add fireworks-js
```

## Usage

```js
import { Fireworks } from 'fireworks-js'
```

```js
const { Fireworks } = require('fireworks-js')
```

```html
<script src="https://crashmax-off.github.io/fireworks-js/fireworks.js"></script>
```

```js
const container = document.querySelector('.fireworks-container')

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
        enable: false,
        list: [
            'explosion0.mp3',
            'explosion1.mp3',
            'explosion2.mp3'
        ],
        min: 4,
        max: 8
    }
})

// start fireworks
fireworks.start()

// paused fireworks
fireworks.pause()

// cleared fireworks
fireworks.clear()

// stop and cleared fireworks
fireworks.stop()
```
