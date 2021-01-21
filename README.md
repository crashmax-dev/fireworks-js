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
    <img alt="Travis (.org)" src="https://img.shields.io/travis/crashmax-off/fireworks-js">
    <img alt="npm" src="https://img.shields.io/npm/v/fireworks-js">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/fireworks-js">
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
<script src="https://crashmax-off.github.io/fireworks-js/fireworks.js">
```

```js
const fireworks = new Fireworks({
    id: 'fireworks',
    hue: 120,
    startDelay: 1,
    minDelay: 20,
    maxDelay: 30,
    speed: 4,
    acceleration: 1.05,
    friction: 0.98,
    gravity: 1,
    particles: 75
})

fireworks.start()
```