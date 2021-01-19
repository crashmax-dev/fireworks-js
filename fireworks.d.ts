interface FireworksOptions {
    id: string;
    hue?: number;
    delay?: number;
    minDelay?: number;
    maxDelay?: number;
    boundaries?: BoundariesOptions;
    fireworkSpeed?: number;
    fireworkAcceleration?: number;
    particleCount?: number;
    particleFriction?: number;
    particleGravity?: number;
}
interface BoundariesOptions {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
export declare class Fireworks {
    private _canvas;
    private _width;
    private _height;
    private _ctx;
    private _hue;
    private _delay;
    private _minDelay;
    private _maxDelay;
    private _boundaries;
    private _speed;
    private _acceleration;
    private _particleCount;
    private _friction;
    private _gravity;
    private _running;
    private _tick;
    private _fireworks;
    private _particles;
    constructor(params: FireworksOptions);
    start(): void;
    stop(): void;
    pause(): void;
    clear(): void;
    get isRunning(): boolean;
    private render;
    private getCanvasElement;
}
export {};
