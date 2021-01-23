import { Trace } from './trace'
import { Explosion } from './explosion'

import {
    getRender,
    randomFloat,
    randomInteger
} from './utils/index'

interface FireworksOptions {
    target: Element | HTMLElement
    hue?: number
    startDelay?: number
    minDelay?: number
    maxDelay?: number
    speed?: number
    acceleration?: number
    friction?: number
    gravity?: number
    particles?: number
    trace?: number
    explosion?: number
    boundaries?: BoundariesOptions
    sound?: SoundOptions
}

interface BoundariesOptions {
    top: number
    bottom: number
    left: number
    right: number
}

interface SoundOptions {
    enable: boolean
    list?: string[]
    min?: number
    max?: number
}

interface FireworksDraw {
    draw: () => void
    update: (args: (x: number, y: number, hue: number) => void) => void
}

export class Fireworks {
    private _canvas: HTMLCanvasElement
    private _ctx: CanvasRenderingContext2D
    private _width: number
    private _height: number

    private _hue: number
    private _startDelay: number
    private _minDelay: number
    private _maxDelay: number
    private _speed: number
    private _acceleration: number
    private _friction: number
    private _gravity: number
    private _particleCount: number
    private _traceLength: number
    private _explosionLength: number
    private _boundaries: BoundariesOptions
    private _sound = {
        enable: false,
        list: [
            'explosion0.mp3',
            'explosion1.mp3',
            'explosion2.mp3'
        ],
        min: 4,
        max: 8
    }

    private _tick = 0
    private _version = '1.0.3'
    private _running = false

    private _fireworks: FireworksDraw[] = []
    private _particles: FireworksDraw[] = []

    constructor(params: FireworksOptions) {
        this._canvas = document.createElement('canvas')
        this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D
        this._width = params.target.clientWidth
        this._height = params.target.clientHeight
        this._canvas.width = this._width
        this._canvas.height = this._height
        params.target.appendChild(this._canvas)

        this._hue = params.hue || 120
        this._startDelay = params.startDelay || 30
        this._minDelay = params.minDelay || 30
        this._maxDelay = params.maxDelay || 90
        this._speed = params.speed || 2
        this._acceleration = params.acceleration || 1.05
        this._friction = params.friction || 0.95
        this._gravity = params.gravity || 1.5
        this._particleCount = params.particles || 50
        this._traceLength = params.trace || 3
        this._explosionLength = params.explosion || 5
        this._boundaries = {
            top: 50,
            bottom: this._height,
            left: 50,
            right: this._width,
            ...params.boundaries
        }
        this._sound = { ...this._sound, ...params.sound }
    }

    start() {
        if (this._running) {
            return
        }

        this._running = true
        this.clear()
        this.render()
    }

    stop() {
        this._running = false
        this.clear()
    }

    pause() {
        this._running = !this._running

        if (this._running) {
            this.render()
        }
    }

    clear() {
        if (!this._ctx) {
            return
        }

        this._fireworks = []
        this._particles = []
        this._ctx.clearRect(0, 0, this._width, this._height)
    }

    get isRunning() {
        return this._running
    }

    private render() {
        if (!this._ctx || !this._running) {
            return
        }

        let length: number

        getRender(() => this.render())

        this._hue += 0.5
        this._ctx.globalCompositeOperation = 'destination-out'
        this._ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        this._ctx.fillRect(0, 0, this._width, this._height)
        this._ctx.globalCompositeOperation = 'lighter'

        length = this._fireworks.length
        while (length--) {
            this._fireworks[length].draw()
            this._fireworks[length].update((x: number, y: number, hue: number) => {
                let count = this._particleCount

                if (this._sound.enable && this._sound.list.length > 0) {
                    let index = randomInteger(0, this._sound.list.length - 1)
                    let volume = randomFloat(this._sound.min / 10, this._sound.max / 10)
                    let audio = new Audio(this._sound.list[index])

                    audio.volume = volume
                    audio.play()
                }

                while (count--) {
                    this._particles.push(new Explosion(
                        x,
                        y,
                        this._ctx,
                        hue,
                        this._friction,
                        this._gravity,
                        this._explosionLength
                    ))
                }

                this._fireworks.splice(length, 1)
            })
        }

        length = this._particles.length
        while (length--) {
            this._particles[length].draw()
            this._particles[length].update(() => {
                this._particles.splice(length, 1)
            })
        }

        if (this._tick > (this._startDelay * 2)) {
            this._fireworks.push(new Trace(
                this._width * 0.5,
                this._height,
                randomInteger(this._boundaries.left, this._boundaries.right - 50),
                randomInteger(this._boundaries.top, this._boundaries.bottom * 0.5),
                this._ctx,
                this._hue,
                this._speed,
                this._acceleration,
                this._traceLength
            ))

            this._startDelay = randomInteger(this._minDelay, this._maxDelay)
            this._tick = 0
        }

        if (this._hue > 345) {
            this._hue = 0
        }

        this._tick++
    }
}