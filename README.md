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
    <a href="https://travis-ci.org/github/crashmax-dev/fireworks-js" target="_blank"><img alt="Travis (.org)" src="https://img.shields.io/travis/crashmax-dev/fireworks-js"></a>
    <a href="https://www.npmjs.com/package/fireworks-js" target="_blank"><img alt="npm" src="https://img.shields.io/npm/v/fireworks-js"></a>
    <a href="#"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/fireworks-js"></a>
</p>

## Demo

> https://crashmax-dev.github.io/fireworks-js/

## Installation

with npm:

```
npm install fireworks-js
```

or yarn:

```
yarn add fireworks-js
```

## Usage

```js 
// ES6
import { Fireworks } from 'fireworks-js'
```

```js
// commonjs
const { Fireworks } = require('fireworks-js')
```

```html
<!-- including in your html page -->
<script src="https://crashmax-dev.github.io/fireworks-js/fireworks.js"></script>
```

```js
// use querySelector or getElementById
const container = document.querySelector('.fireworks-container')

// default config
const fireworks = new Fireworks({
    target: container
})

fireworks.start()

fireworks.pause()

fireworks.clear()

// stop and clear fireworks
fireworks.stop()
```

## Options

* **hue**: (default: `120`)
* **startDelay**: (default: `30`)
* **minDelay**: (default: `30`)
* **maxDelay**: (default: `90`)
* **speed**: (default: `2`)
* **acceleration**: (default: `1.05`)
* **friction**: (default: `0.95`)
* **gravity**: (default: `1.5`)
* **particles**: (default: `50`)
* **trace**: (default: `3`)
* **explosion**: (default: `5`)
* **autoresize**: (default: `true`)
* **boundaries**: (default: `{ top: 50, bottom: 0, left: 50, right: 0 }`)
* **sound**: (default: `{ enable: false, { list: [ ... ], min: 4, max: 8 }`)