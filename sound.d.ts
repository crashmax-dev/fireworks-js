import type { SoundOptions } from './fireworks';
declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext;
    }
}
export declare class Sound {
    options: Required<SoundOptions>;
    private _buffer;
    private _audioContext;
    private onInit;
    constructor(options: SoundOptions | undefined);
    private init;
    private load;
    play(): void;
}
