import { BrightnessOptions } from './fireworks';
interface ExplosionOptions {
    x: number;
    y: number;
    ctx: CanvasRenderingContext2D;
    hue: number;
    friction: number;
    gravity: number;
    explosionLength: number;
    brightness: Required<BrightnessOptions>;
    exp: boolean;
}
export declare class Explosion {
    private _x;
    private _y;
    private _ctx;
    private _friction;
    private _gravity;
    private _explosionLength;
    private _coordinates;
    private _angle;
    private _speed;
    private _hue;
    private _brightness;
    private _decay;
    private _alpha;
    private _exp;
    constructor({ x, y, ctx, hue, exp, gravity, friction, brightness, explosionLength }: ExplosionOptions);
    update(callback: () => void): void;
    draw(): void;
}
export {};
