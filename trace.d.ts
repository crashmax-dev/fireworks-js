export declare class Trace {
    private _x;
    private _y;
    private _sx;
    private _sy;
    private _dx;
    private _dy;
    private _ctx;
    private _hue;
    private _speed;
    private _acceleration;
    private _traceLength;
    private _totalDistance;
    private _currentDistance;
    private _coordinates;
    private _angle;
    private _brightness;
    constructor(x1: number, y1: number, x2: number, y2: number, ctx: CanvasRenderingContext2D, hue: number, speed: number, acceleration: number, trace: number);
    update(callback: (x: number, y: number, hue: number) => void): void;
    draw(): void;
    private getDistance;
}
