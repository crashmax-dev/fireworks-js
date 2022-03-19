interface TraceOptions {
    x: number;
    y: number;
    dx: number;
    dy: number;
    ctx: CanvasRenderingContext2D;
    hue: number;
    speed: number;
    acceleration: number;
    traceLength: number;
}
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
    private _coordinates;
    private _angle;
    private _brightness;
    private _currentDistance;
    constructor({ x, y, dx, dy, ctx, hue, speed, traceLength, acceleration }: TraceOptions);
    update(callback: (x: number, y: number, hue: number) => void): void;
    draw(): void;
}
export {};
