export declare class Trace {
    private _x;
    private _y;
    private _sx;
    private _sy;
    private _dx;
    private _dy;
    private _ctx;
    private _totalDistance;
    private _currentDistance;
    private _coordinates;
    private _coordinateCount;
    private _angle;
    private _speed;
    private _acceleration;
    private _hue;
    private _brightness;
    constructor(x1: number, y1: number, x2: number, y2: number, context: CanvasRenderingContext2D, hue: number, speed: number, acceleration: number);
    update(callback: Function): void;
    draw(): void;
}
