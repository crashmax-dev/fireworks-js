import { BrightnessOptions } from './fireworks'
import { randomFloat, randomInt, hsla } from './helpers'

interface ExplosionOptions {
  x: number
  y: number
  ctx: CanvasRenderingContext2D
  hue: number
  friction: number
  gravity: number
  explosionLength: number
  brightness: Required<BrightnessOptions>
  exp: boolean
}

export class Explosion {
  private _x: number
  private _y: number
  private _ctx: CanvasRenderingContext2D
  private _friction: number
  private _gravity: number
  private _explosionLength: number

  private _coordinates: [number, number][] = []
  private _angle: number
  private _speed: number
  private _hue: number
  private _brightness: number
  private _decay: number
  private _alpha = 1
  private _exp: boolean

  constructor({
    x,
    y,
    ctx,
    hue,
    exp,
    gravity,
    friction,
    brightness,
    explosionLength
  }: ExplosionOptions) {
    this._x = x
    this._y = y
    this._exp = exp
    this._ctx = ctx
    this._gravity = gravity
    this._friction = friction
    this._explosionLength = explosionLength

    while (this._explosionLength--) {
      this._coordinates.push([x, y])
    }

    this._angle = randomFloat(0, Math.PI * 2)
    this._speed = randomInt(1, 10)
    this._hue = randomInt(hue - 20, hue + 20)
    this._brightness = randomInt(brightness.min, brightness.max)
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
    const lastIndex = this._coordinates.length - 1

    this._ctx.beginPath()

    // experimental
    if (this._exp) {
      this._ctx.arc(
        this._x,
        this._y,
        randomFloat(0.5, 1.5),
        0,
        Math.PI * 2
      )
      this._ctx.fill()
    }

    this._ctx.fillStyle = hsla(this._hue, this._brightness, this._alpha)
    this._ctx.moveTo(this._coordinates[lastIndex][0], this._coordinates[lastIndex][1])
    this._ctx.lineTo(this._x, this._y)
    this._ctx.strokeStyle = hsla(this._hue, this._brightness, this._alpha)
    this._ctx.stroke()
  }
}