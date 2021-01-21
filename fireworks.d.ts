interface FireworksOptions {
    id: string;
    hue?: number;
    startDelay?: number;
    minDelay?: number;
    maxDelay?: number;
    boundaries?: BoundariesOptions;
    speed?: number;
    acceleration?: number;
    particles?: number;
    friction?: number;
    gravity?: number;
    sound?: SoundOptions;
}
interface BoundariesOptions {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
interface SoundOptions {
    enable: boolean;
    min: number;
    max: number;
}
export declare class Fireworks {
    private _canvas;
    private _width;
    private _height;
    private _ctx;
    private _hue;
    private _startDelay;
    private _minDelay;
    private _maxDelay;
    private _boundaries;
    private _speed;
    private _acceleration;
    private _particleCount;
    private _friction;
    private _gravity;
    private _sound;
    private _tick;
    private _version;
    private _running;
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
