import { SoundOptions } from './fireworks';
export declare class Sound {
    options: Required<SoundOptions>;
    private _buffer;
    private _audioContext;
    constructor(options: SoundOptions | undefined);
    private load;
    play(): Promise<void>;
}
