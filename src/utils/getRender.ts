declare global {
    interface Window {
        mozRequestAnimationFrame(e: FrameRequestCallback): void
        oRequestAnimationFrame(e: FrameRequestCallback): void
        msRequestAnimationFrame(e: FrameRequestCallback): void
    }
}

export const getRender =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback: TimerHandler) {
        return window.setTimeout(callback, 1000 / 60)
    }