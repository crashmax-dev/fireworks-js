declare type HTMLContainer = Element | HTMLElement;
interface FireworksOptions {
    hue?: MinMaxOptions;
    rocketsPoint?: number;
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
interface BrightnessOptions {
    min: number;
    max: number;
    decay?: MinMaxOptions;
}
interface MouseOptions {
    click?: boolean;
    move?: boolean;
    max?: number;
}
interface BoundariesOptions {
    x: number;
    y: number;
    width: number;
    height: number;
}
interface SoundOptions {
    enable: boolean;
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
declare class Fireworks {
    [key: string]: unknown;
    private _container;
    private _canvas;
    private _ctx;
    private _width;
    private _height;
    private _hue;
    private _rocketsPoint;
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
    private _delay;
    private _brightness;
    private _tick;
    private _version;
    private _running;
    private _visibleBoundaries;
    private _randomRocketsPoint;
    private _m;
    private _mx;
    private _my;
    private _ds;
    private _sound;
    private _traces;
    private _explosions;
    constructor(container: HTMLContainer, { acceleration, autoresize, boundaries, brightness, delay, explosion, friction, gravity, hue, mouse, particles, sound, speed, rocketsPoint, trace }?: FireworksOptions);
    get isRunning(): boolean;
    get version(): string;
    start(): void;
    stop(): void;
    pause(): void;
    clear(): void;
    /**
     * Changing fireworks parameters
     *
     * @param key
     * @param value
     */
    setOptions<T extends keyof FireworksOptions>(key: T, value: Partial<FireworksOptions[T]>): void;
    /**
     * Changing the container canvas size
     *
     * @param {Sizes}
     */
    setSize({ width, height }?: Sizes): void;
    /**
     * Show/hide border firework boundaries
     */
    visibleBoudaries(): void;
    /**
     * Changing the boundaries of fireworks
     *
     * @param boundaries
     */
    setBoundaries(boundaries: Partial<BoundariesOptions>): void;
    private useMouse;
    private render;
    private initTrace;
    private drawTrace;
    private initExplosion;
    private drawExplosion;
}
export { Fireworks, FireworksOptions, MouseOptions, BoundariesOptions, SoundOptions, BrightnessOptions };
