import type { BrightnessOptions } from './fireworks';
interface ExplosionOptions {
    x: number;
    y: number;
    ctx: CanvasRenderingContext2D;
    hue: number;
    friction: number;
    gravity: number;
    explosionLength: number;
    flickering: boolean;
    lineWidth: number;
    brightness: Required<BrightnessOptions>;
}
export declare class Explosion {
    private _x;
    private _y;
    private _ctx;
    private _friction;
    private _gravity;
    private _flickering;
    private _lineWidth;
    private _explosionLength;
    private _coordinates;
    private _angle;
    private _speed;
    private _hue;
    private _brightness;
    private _decay;
    private _alpha;
    constructor({ x, y, ctx, hue, gravity, friction, brightness, flickering, lineWidth, explosionLength }: ExplosionOptions);
    update(callback: () => void): void;
    draw(): void;
}
export {};
