import { BrightnessOptions } from './fireworks';
export declare class Explosion {
    private _x;
    private _y;
    private _ctx;
    private _coordinates;
    private _explosionLength;
    private _angle;
    private _speed;
    private _friction;
    private _gravity;
    private _hue;
    private _brightness;
    private _alpha;
    private _decay;
    constructor(x: number, y: number, ctx: CanvasRenderingContext2D, hue: number, friction: number, gravity: number, explosion: number, brightness: Required<BrightnessOptions>);
    update(callback: () => void): void;
    draw(): void;
}
