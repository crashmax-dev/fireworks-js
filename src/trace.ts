import {
    getDistance,
    randomInteger
} from './utils/index'

export class Trace {
    private _x: number
    private _y: number
    private _sx: number
    private _sy: number
    private _dx: number
    private _dy: number
    private _ctx: CanvasRenderingContext2D
    private _totalDistance = 0
    private _currentDistance = 0
    private _coordinates: [number, number][] = []
    private _coordinateCount = 3
    private _angle = 0
    private _speed: number
    private _acceleration: number
    private _hue: string | number
    private _brightness = 0

    constructor(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        context: CanvasRenderingContext2D,
        hue: number,
        speed: number,
        acceleration: number
    ) {
        this._x = x1
        this._y = y1
        this._sx = x1
        this._sy = y1
        this._dx = x2
        this._dy = y2
        this._ctx = context
        this._hue = hue
        this._speed = speed
        this._acceleration = acceleration

        this._totalDistance = getDistance(this._sx, this._sy, this._dx, this._dy)

        while (this._coordinateCount--) {
            this._coordinates.push([x1, y1])
        }

        this._angle = Math.atan2(this._dy - this._sy, this._dx - this._sx)
        this._brightness = randomInteger(50, 70)
    }

    update(callback: Function) {
        this._coordinates.pop()
        this._coordinates.unshift([this._x, this._y])
        this._speed *= this._acceleration

        let vx = Math.cos(this._angle) * this._speed,
            vy = Math.sin(this._angle) * this._speed

        this._currentDistance = getDistance(this._sx, this._sy, this._x + vx, this._y + vy)

        if (this._currentDistance >= this._totalDistance) {
            callback(this._dx, this._dy, this._hue)
        } else {
            this._x += vx
            this._y += vy
        }
    }

    draw() {
        let last = this._coordinates.length - 1

        this._ctx.beginPath()
        this._ctx.moveTo(this._coordinates[last][0], this._coordinates[last][1])
        this._ctx.lineTo(this._x, this._y)
        this._ctx.strokeStyle = 'hsl(' + this._hue + ', 100%, ' + this._brightness + '%)'
        this._ctx.stroke()
    }
}