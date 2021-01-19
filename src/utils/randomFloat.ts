/**
 * 
 * @param min
 * @param max
 */
export function randomFloat(min: number, max: number) {
    return (Math.random() * (max - min) + min)
}