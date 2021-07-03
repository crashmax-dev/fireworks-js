<br/>
<p align="center">
    <img src="test/images/fireworks_emoji.png" />
</p>

<p align="center"><b>Fireworks.js</b></p>

<p align="center">
    A simple fireworks library!
</p>
<br/>

<p align="center">
    <a href="https://travis-ci.com/github/crashmax-dev/fireworks-js" target="_blank"><img alt="Travis (.org)" src="https://travis-ci.com/crashmax-dev/fireworks-js.svg?branch=master"></a>
    <a href="https://www.npmjs.com/package/fireworks-js" target="_blank"><img alt="npm" src="https://img.shields.io/npm/v/fireworks-js"></a>
    <a href="https://bundlephobia.com/package/fireworks-js@latest"><img alt="npm bundle size" src="https://badgen.net/bundlephobia/min/fireworks-js"></a>
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
<script src="https://unpkg.com/fireworks-js@latest/dist/fireworks.js"></script>
```

```js
// use querySelector or getElementById
const container = document.querySelector('.fireworks-container')

// default config
const fireworks = new Fireworks(container, {
    // options
})

fireworks.start()

fireworks.pause()

fireworks.clear()

// stop and clear fireworks
fireworks.stop()
```

For React.js (see detailed usage [here](test/react.tsx))

```js
import { Fireworks } from 'fireworks-js/dist/react'

export const App = () => {
  const options = {
    speed: 3
  }

  const style = {
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: '#000'
  }

  return <Fireworks options={options} style={style} />
}
```

## Options

key | default values
----|---------------
`speed` | `2`
`acceleration` | `1.05`
`friction` | `0.95`
`gravity` | `1.5`
`particles` | `50`
`trace` | `3`
`explosion` | `5`
`autoresize` | `true`
`hue` | `{ min: 0, max: 360 }`
`delay` | `{ min: 15, max: 30 }`
`boundaries` | `{ top: 50, bottom: container.clientHeight, left: 50, right: container.clientWidth }`
`sound` | `{ enable: false }`
`sound.files` | `[ '*.mp3', '*.ogg', '*.wav' ]`
`sound.volume` | `{ min: 1, max: 2 }`
`mouse` |`{ click: false, move: false, max: 3 }`
`brightness` | ` { min: 50, max: 80 }`
`brightness.decay` | `{ min: 0.015, max: 0.03 }`