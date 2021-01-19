declare global {
    interface Window {
        mozRequestAnimationFrame(e: FrameRequestCallback): void;
        oRequestAnimationFrame(e: FrameRequestCallback): void;
        msRequestAnimationFrame(e: FrameRequestCallback): void;
    }
}
export declare const getRender: ((callback: FrameRequestCallback) => number) & typeof requestAnimationFrame;
