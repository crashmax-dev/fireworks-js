import { randomInteger } from './utils'

interface TraceOptions {
  x: number
  y: number
  dx: number
  dy: number
  ctx: CanvasRenderingContext2D
  hue: number
  speed: number
  acceleration: number
  traceLength: number
}

export class Trace {
  private _x: number
  private _y: number
  private _sx: number
  private _sy: number
  private _dx: number
  private _dy: number
  private _ctx: CanvasRenderingContext2D
  private _hue: number
  private _speed: number
  private _acceleration: number
  private _traceLength: number

  private _totalDistance: number
  private _coordinates: [number, number][] = []
  private _angle: number
  private _brightness: number
  private _currentDistance = 0

  constructor({
    x,
    y,
    dx,
    dy,
    ctx,
    hue,
    speed,
    acceleration,
    traceLength
  }: TraceOptions) {
    this._x = x
    this._y = y
    this._sx = x
    this._sy = y
    this._dx = dx
    this._dy = dy
    this._ctx = ctx
    this._hue = hue
    this._speed = speed
    this._acceleration = acceleration
    this._traceLength = traceLength

    this._totalDistance = this.getDistance(x, y, dx, dy)

    while (this._traceLength--) {
      this._coordinates.push([x, y])
    }

    this._angle = Math.atan2(dy - y, dx - x)
    this._brightness = randomInteger(50, 70)
  }

  update(callback: (x: number, y: number, hue: number) => void): void {
    this._coordinates.pop()
    this._coordinates.unshift([this._x, this._y])
    this._speed *= this._acceleration

    const vx = Math.cos(this._angle) * this._speed
    const vy = Math.sin(this._angle) * this._speed

    this._currentDistance = this.getDistance(
      this._sx,
      this._sy,
      this._x + vx,
      this._y + vy
    )

    if (this._currentDistance >= this._totalDistance) {
      callback(this._dx, this._dy, this._hue)
    } else {
      this._x += vx
      this._y += vy
    }
  }

  draw(): void {
    const last = this._coordinates.length - 1

    this._ctx.beginPath()
    this._ctx.moveTo(this._coordinates[last][0], this._coordinates[last][1])
    this._ctx.lineTo(this._x, this._y)
    this._ctx.strokeStyle = `hsl(${this._hue}, 100%, ${this._brightness}%)`
    this._ctx.stroke()
  }

  private getDistance(x: number, y: number, dx: number, dy: number) {
    const pow = Math.pow
    return Math.sqrt(pow(x - dx, 2) + pow(y - dy, 2))
  }
}