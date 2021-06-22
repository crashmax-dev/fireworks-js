import { BrightnessOptions } from './fireworks'
import { randomFloat, randomInteger } from './utils'

export class Explosion {
  private _x: number
  private _y: number
  private _ctx: CanvasRenderingContext2D
  private _coordinates: [number, number][] = []
  private _explosionLength: number
  private _angle: number
  private _speed: number
  private _friction: number
  private _gravity: number
  private _hue: number
  private _brightness: number
  private _alpha = 1
  private _decay: number

  constructor(
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
    hue: number,
    friction: number,
    gravity: number,
    explosion: number,
    brightness: Required<BrightnessOptions>
  ) {
    this._x = x
    this._y = y
    this._ctx = ctx
    this._hue = hue
    this._friction = friction
    this._gravity = gravity
    this._explosionLength = explosion

    while (this._explosionLength--) {
      this._coordinates.push([x, y])
    }

    this._angle = randomFloat(0, Math.PI * 2)
    this._speed = randomInteger(1, 10)
    this._hue = randomInteger(this._hue - 20, this._hue + 20)
    this._brightness = randomInteger(brightness.min, brightness.max)
    this._decay = randomFloat(brightness.decay.min, brightness.decay.max)
  }

  update(callback: () => void): void {
    this._coordinates.pop()
    this._coordinates.unshift([this._x, this._y])
    this._speed *= this._friction
    this._x += Math.cos(this._angle) * this._speed
    this._y += Math.sin(this._angle) * this._speed + this._gravity
    this._alpha -= this._decay

    if (this._alpha <= this._decay) {
      callback()
    }
  }

  draw(): void {
    const last = this._coordinates.length - 1

    this._ctx.beginPath()
    // experimental
    // this._ctx.arc(this._x, this._y, 1, 0, Math.PI * 2)
    this._ctx.moveTo(this._coordinates[last][0], this._coordinates[last][1])
    this._ctx.lineTo(this._x, this._y)
    this._ctx.strokeStyle = `hsla(${this._hue}, 100%, ${this._brightness}%, ${this._alpha})`
    this._ctx.stroke()
  }
}