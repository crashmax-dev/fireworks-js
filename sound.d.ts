interface SoundOptions {
    enable: boolean;
    files?: string[];
    volume?: {
        min: number;
        max: number;
    };
}
declare class Sound {
    options: Required<SoundOptions>;
    private _buffer;
    private _audioContext;
    constructor(options: SoundOptions | undefined);
    private load;
    play(): Promise<void>;
}
export { Sound, SoundOptions };
