/**
 * 
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 */
export function getDistance(x1: number, y1: number, x2: number, y2: number) {
    const pow = Math.pow
    return Math.sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2))
}