declare type HTMLContainer = Element | HTMLElement;
interface FireworksOptions {
    hue?: MinMaxOptions;
    speed?: number;
    acceleration?: number;
    friction?: number;
    gravity?: number;
    particles?: number;
    trace?: number;
    explosion?: number;
    autoresize?: boolean;
    mouse?: MouseOptions;
    boundaries?: BoundariesOptions;
    sound?: SoundOptions;
    delay?: MinMaxOptions;
}
interface MouseOptions {
    click: boolean;
    move: boolean;
    max: number;
}
interface BoundariesOptions {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
interface SoundOptions {
    enable: boolean;
    files: string[];
    min: number;
    max: number;
}
interface MinMaxOptions {
    min: number;
    max: number;
}
interface Sizes {
    width?: number;
    height?: number;
}
export declare class Fireworks {
    private _container;
    private _canvas;
    private _ctx;
    private _width;
    private _height;
    private _hue;
    private _speed;
    private _acceleration;
    private _friction;
    private _gravity;
    private _particleCount;
    private _traceLength;
    private _explosionLength;
    private _autoresize;
    private _boundaries;
    private _mouse;
    private _sound;
    private _delay;
    private _tick;
    private _version;
    private _running;
    private _m;
    private _mx;
    private _my;
    private _ds;
    private _traces;
    private _explosions;
    constructor(container: HTMLContainer, { hue, speed, acceleration, friction, gravity, particles, trace, explosion, autoresize, mouse, boundaries, sound, delay }: FireworksOptions);
    get isRunning(): boolean;
    get version(): string;
    start(): void;
    stop(): void;
    pause(): void;
    clear(): void;
    updateSize({ width, height }?: Sizes): void;
    updateBoundaries(boundaries: Partial<BoundariesOptions>): void;
    private useMouse;
    private playSound;
    private render;
    private initTrace;
    private drawTrace;
    private initExplosion;
    private drawExplosion;
}
export {};
