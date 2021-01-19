/**
 * 
 * @param min
 * @param max
 */
export function randomInteger(min: number, max: number) {
    return Math.floor(min + Math.random() * (max + 1 - min))
}