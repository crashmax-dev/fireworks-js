declare type HTMLContainer = Element | HTMLElement;
export interface FireworksOptions {
    hue?: MinMaxOptions;
    rocketsPoint?: number;
    opacity?: number;
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
    brightness?: BrightnessOptions;
}
export interface BrightnessOptions extends MinMaxOptions {
    decay?: MinMaxOptions;
}
export interface MouseOptions {
    click?: boolean;
    move?: boolean;
    max?: number;
}
export interface BoundariesOptions {
    visible?: boolean;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}
export interface SoundOptions {
    enabled?: boolean;
    files?: string[];
    volume?: MinMaxOptions;
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
    [key: string]: unknown;
    private _container;
    private _canvas;
    private _ctx;
    private _width;
    private _height;
    private hue;
    private rocketsPoint;
    private opacity;
    private speed;
    private acceleration;
    private friction;
    private gravity;
    private particles;
    private trace;
    private explosion;
    private autoresize;
    private boundaries;
    private mouse;
    private delay;
    private brightness;
    private _tick;
    private _version;
    private _running;
    private _randomRocketsPoint;
    private _experimentals;
    private _m;
    private _mx;
    private _my;
    private _ds;
    private _sound;
    private _traces;
    private _explosions;
    constructor(container: HTMLContainer, { autoresize, boundaries, brightness, delay, hue, mouse, sound, trace, speed, explosion, gravity, opacity, particles, friction, rocketsPoint, acceleration }?: FireworksOptions);
    get isRunning(): boolean;
    get version(): string;
    start(): void;
    stop(): void;
    unmount(): void;
    pause(): void;
    clear(): void;
    setOptions(options: FireworksOptions): void;
    setSize({ width, height }?: Partial<Sizes>): void;
    setBoundaries(boundaries: Partial<BoundariesOptions>): void;
    private useMouse;
    private windowResize;
    private mouseDown;
    private mouseUp;
    private mouseMove;
    private render;
    private drawBoundaries;
    private initTrace;
    private drawTrace;
    private initExplosion;
    private drawExplosion;
}
export {};
