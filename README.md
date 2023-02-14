[![](https://fireworks.js.org/images/fireworks_banner.gif)](https://fireworks.js.org)

<p align="center">
  <b>A simple fireworks library! | <a href="https://fireworks.js.org">fireworks.js.org</a></b>
</p>

<p align="center">
  <a href="https://github.com/crashmax-dev/fireworks-js/actions">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/crashmax-dev/fireworks-js/gh-pages.yml?branch=master">
  </a>
  <a href="https://github.com/crashmax-dev/fireworks-js/blob/master/LICENSE">
    <img alt="GitHub" src="https://img.shields.io/github/license/crashmax-dev/fireworks-js?color=success">
  </a>
  <a href="https://www.npmjs.com/package/fireworks-js">
    <img alt="npm" src="https://img.shields.io/npm/v/fireworks-js?color=orange">
  </a>
  <a href="https://www.npmjs.com/package/fireworks-js">
    <img alt="npm" src="https://img.shields.io/npm/dt/fireworks-js?color=blue">
  </a>
  <a href="https://bundlephobia.com/package/fireworks-js@latest">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/fireworks-js">
  </a>
</p>

---

## Table of Contents

> **Warning**\
> This readme refers to upcoming v2 version, [read here](https://github.com/crashmax-dev/fireworks-js/tree/v1) for v1 documentation.

- [Features](#features)
- [Browsers support](#browsers-support)
- [Demo](#demo)
- [Installation](#installation)
- [CDN](#cdn)
- [Usage](#usage)
  - [fireworks-js](#fireworks-js)
  - [@fireworks-js/react](#fireworks-jsreact)
  - [@fireworks-js/preact](#fireworks-jspreact)
  - [@fireworks-js/solid](#fireworks-jssolid)
  - [@fireworks-js/vue](#fireworks-jsvue)
  - [@fireworks-js/svelte](#fireworks-jssvelte)
  - [@fireworks-js/angular](#fireworks-jsangular)
  - [@fireworks-js/web](#fireworks-jsweb)
- [Documentation](#documentation)
  - [Options](#options)
  - [API](#api)
- [Community](#community)

## Features

 - 🔥 Zero [dependencies](https://www.npmjs.com/package/fireworks-js?activeTab=dependencies)
 - ⚙️ Flexible [configuration](#options)
 - 📦 Lightweight ([~3.0kB gzipped](https://bundlephobia.com/package/fireworks-js))
 - 📜 Supports [TypeScript](https://www.typescriptlang.org) type definition

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/yandex/yandex_48x48.png" alt="Yandex" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Yandex |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔

## Demo

You can play with `fireworks-js` at [fireworks.js.org](https://fireworks.js.org) or [codesandbox.io](https://codesandbox.io/s/fireworks-js-react-bjeoqy?file=/src/App.tsx)

## Installation

```sh
npm install fireworks-js
```

```sh
yarn add fireworks-js
```

```sh
pnpm add fireworks-js
```

| Package | Status | Description |
| ------- | ------ | ----------- |
| [fireworks-js](#fireworks-js) | [![](https://img.shields.io/npm/v/fireworks-js)](https://npm.im/fireworks-js) | Vanilla JS |
| [@fireworks-js/react](#fireworks-jsreact) | [![](https://img.shields.io/npm/v/@fireworks-js/react.svg)](https://npm.im/@fireworks-js/react) | React component |
| [@fireworks-js/preact](#fireworks-jspreact) | [![](https://img.shields.io/npm/v/@fireworks-js/preact.svg)](https://npm.im/@fireworks-js/preact) | Preact component |
| [@fireworks-js/solid](#fireworks-jssolid) | [![](https://img.shields.io/npm/v/@fireworks-js/solid.svg)](https://npm.im/@fireworks-js/solid) | Solid component |
| [@fireworks-js/vue](#fireworks-jsvue) | [![](https://img.shields.io/npm/v/@fireworks-js/vue.svg)](https://npm.im/@fireworks-js/vue) | Vue 3 component |
| [@fireworks-js/svelte](#fireworks-jssvelte) | [![](https://img.shields.io/npm/v/@fireworks-js/svelte.svg)](https://npm.im/@fireworks-js/svelte) | Svelte component |
| [@fireworks-js/angular](#fireworks-jsangular) | [![](https://img.shields.io/npm/v/@fireworks-js/angular.svg)](https://npm.im/@fireworks-js/angular) | Angular component |
| [@fireworks-js/web](#fireworks-jsweb) | [![](https://img.shields.io/npm/v/@fireworks-js/web.svg)](https://npm.im/@fireworks-js/web) | Web components |

# CDN

```html
<!-- jsDelivr  -->
<script src="https://cdn.jsdelivr.net/npm/fireworks-js@2.x/dist/index.umd.js"></script>

<!-- UNPKG -->
<script src="https://unpkg.com/fireworks-js@2.x/dist/index.umd.js"></script>

<!-- Usage -->
<script>
  const container = document.querySelector('.fireworks')
  const fireworks = new Fireworks.default(container)
  fireworks.start()
</script>
```

## Usage

#### [`fireworks-js`](https://github.com/crashmax-dev/fireworks-js/tree/master/examples/basic)

```js
import { Fireworks } from 'fireworks-js'

const container = document.querySelector('.container')
const fireworks = new Fireworks(container, { /* options */ })
fireworks.start()
```

[![Edit @fireworks-js/react](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/blissful-sanderson-dkvnx4)

#### [`@fireworks-js/react`](https://github.com/crashmax-dev/fireworks-js/tree/master/examples/with-react)

```sh
npm install @fireworks-js/react
```

[![Edit @fireworks-js/react](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/fireworks-js-react-bjeoqy?fontsize=14&hidenavigation=1&theme=dark)

#### [`@fireworks-js/preact`](https://github.com/crashmax-dev/fireworks-js/tree/master/examples/with-preact)

```sh
npm install @fireworks-js/preact
```

#### [`@fireworks-js/solid`](https://github.com/crashmax-dev/fireworks-js/tree/master/examples/with-solid)

```sh
npm install @fireworks-js/solid
```

#### [`@fireworks-js/vue`](https://github.com/crashmax-dev/fireworks-js/tree/master/examples/with-vue)

```sh
npm install @fireworks-js/vue
```

#### [`@fireworks-js/svelte`](https://github.com/crashmax-dev/fireworks-js/tree/master/examples/with-svelte)

```sh
npm install @fireworks-js/svelte
```

#### [`@fireworks-js/angular`](https://github.com/crashmax-dev/fireworks-js/tree/master/examples/with-angular)

```sh
npm install @fireworks-js/angular
```

#### [`@fireworks-js/web`](https://github.com/crashmax-dev/fireworks-js/tree/master/examples/with-web-components)

```sh
npm install @fireworks-js/web
```

## Documentation

### Options

> **Note**\
> The options is optional, as are each of its properties.

| Property           | Type                | Default                                                                       |
| ------------------ | ------------------- | ----------------------------------------------------------------------------- |
| `hue`              | object              | [hue](https://github.com/crashmax-dev/fireworks-js/blob/eedee4020e9c458fde83b60dfac6f2502d4593bb/packages/fireworks-js/src/options.ts#L49-L52)                                     |
| `rocketsPoint`     | object              | [rocketsPoint](https://github.com/crashmax-dev/fireworks-js/blob/eedee4020e9c458fde83b60dfac6f2502d4593bb/packages/fireworks-js/src/options.ts#L54-L57)                                     |
| `mouse`            | object              | [mouse](https://github.com/crashmax-dev/fireworks-js/blob/eedee4020e9c458fde83b60dfac6f2502d4593bb/packages/fireworks-js/src/options.ts#L70-L74)                                     |
| `boundaries`       | object              | [boundaries](https://github.com/crashmax-dev/fireworks-js/blob/eedee4020e9c458fde83b60dfac6f2502d4593bb/packages/fireworks-js/src/options.ts#L104-L110)                                   |
| `sound`            | object              | [sound](https://github.com/crashmax-dev/fireworks-js/blob/eedee4020e9c458fde83b60dfac6f2502d4593bb/packages/fireworks-js/src/options.ts#L91-L102)                                    |
| `delay`            | object              | [delay](https://github.com/crashmax-dev/fireworks-js/blob/eedee4020e9c458fde83b60dfac6f2502d4593bb/packages/fireworks-js/src/options.ts#L76-L79)                                     |
| `brightness`       | object              | [brightness](https://github.com/crashmax-dev/fireworks-js/blob/eedee4020e9c458fde83b60dfac6f2502d4593bb/packages/fireworks-js/src/options.ts#L81-L84)                                     |
| `decay`            | object              | [decay](https://github.com/crashmax-dev/fireworks-js/blob/eedee4020e9c458fde83b60dfac6f2502d4593bb/packages/fireworks-js/src/options.ts#L86-L89)                                     |
| `lineWidth`        | object              | [lineWidth](https://github.com/crashmax-dev/fireworks-js/blob/eedee4020e9c458fde83b60dfac6f2502d4593bb/packages/fireworks-js/src/options.ts#L59-L68)                                     |
| `lineStyle`        | string              | round                                                                         |
| `explosion`        | number              | 5                                                                             |
| `opacity`          | number              | 0.5                                                                           |
| `acceleration`     | number              | 1.05                                                                          |
| `friction`         | number              | 0.95                                                                          |
| `gravity`          | number              | 1.5                                                                           |
| `particles`        | number              | 50                                                                            |
| `traceLength`      | number              | 3                                                                             |
| `flickering`       | number              | 50                                                                            |
| `intensity`        | number              | 30                                                                            |
| `traceSpeed`       | number              | 10                                                                            |
| `intensity`        | number              | 30                                                                            |
| `autoresize`       | boolean             | true                                                                          |

The `hue`, `delay`, `decay`, `brightness`, `lineWidth.explosion`, `lineWidth.trace`, `sound.volume` and `rocketsPoint` options accept an object:

| Property | Type    |
| -------- | ------- |
| `min`    | number  |
| `max`    | number  |

> **Note**\
> The `min` and `max` properties are used to randomly select values from the range.

The `mouse` options accept an object:

| Property | Type    | Default |
| -------- | ------- | ------- |
| `click`  | boolean | false   |
| `move`   | boolean | false   |
| `max`    | number  | 1       |

> **Note**\
> The `max` property has no effect if `click` is false.

The `sound` options accept an object:

| Property   | Type      | Default             |
| ---------- | --------- | ------------------- |
| `enabled`  | boolean   | false               |
| `files`    | string[]  | [files](https://github.com/crashmax-dev/fireworks-js/blob/eedee4020e9c458fde83b60dfac6f2502d4593bb/packages/fireworks-js/src/options.ts#L93-L97)  |
| `volume`   | object    | [volume](https://github.com/crashmax-dev/fireworks-js/blob/eedee4020e9c458fde83b60dfac6f2502d4593bb/packages/fireworks-js/src/options.ts#L98-L101) |

```js
const fireworks = new Fireworks(container, {
  autoresize: true,
  opacity: 0.5,
  acceleration: 1.05,
  friction: 0.97,
  gravity: 1.5,
  particles: 50,
  traceLength: 3,
  traceSpeed: 10,
  explosion: 5,
  intensity: 30,
  flickering: 50,
  lineStyle: 'round',
  hue: {
    min: 0,
    max: 360
  },
  delay: {
    min: 30,
    max: 60
  },
  rocketsPoint: {
    min: 50,
    max: 50
  },
  lineWidth: {
    explosion: {
      min: 1,
      max: 3
    },
    trace: {
      min: 1,
      max: 2
    }
  },
  brightness: {
    min: 50,
    max: 80
  },
  decay: {
    min: 0.015,
    max: 0.03
  },
  mouse: {
    click: false,
    move: false,
    max: 1
  }
})
```

### API

#### `.start()`
Start fireworks.

#### `.launch(count)`
Launching a specified number of fireworks.\
Type: `number`\
Default `1`

#### `.stop(dispose)`
Stop fireworks.\
Type: `boolean`\
Default: `false`

#### `.waitStop(dispose)`
Asynchronous stopping of the fireworks.\
Type: `boolean`\
Default: `false`

#### `.pause()`
Start/stop fireworks.

#### `.clear()`
Cleaning the canvas from fireworks.

#### `.currentOptions`
Getting current fireworks options.

#### `.updateOptions(options)`
Force update fireworks options.\
Type: [`options`](https://github.com/crashmax-dev/fireworks-js/blob/6819ec8456ecb97140a8e1f41959ca2da5c17ddf/packages/fireworks-js/src/types.ts#L3-L25)

#### `.updateSize(sizes)`
Force update canvas size.\
Type: [`sizes`](https://github.com/crashmax-dev/fireworks-js/blob/6819ec8456ecb97140a8e1f41959ca2da5c17ddf/packages/fireworks-js/src/types.ts#L58-L61)

#### `.updateBoundaries(boundaries)`
Force update canvas boundaries.\
Type: [`boundaries`](https://github.com/crashmax-dev/fireworks-js/blob/6819ec8456ecb97140a8e1f41959ca2da5c17ddf/packages/fireworks-js/src/types.ts#L35-L40)

## Community

### Star History

[![Star History Chart](https://api.star-history.com/svg?repos=crashmax-dev/fireworks-js&type=Date)](https://star-history.com/#crashmax-dev/fireworks-js&Date)

### Author
- [crashmax](https://github.com/crashmax-dev)

### License
- [MIT](https://github.com/crashmax-dev/fireworks-js/blob/master/LICENSE)
