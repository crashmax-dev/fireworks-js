import {
    randomFloat,
    randomInteger
} from './index'

/**
 * 
 * @param min
 * @param max
 */
export function playSound(min: number, max: number) {
    let index = randomInteger(min, max)
    let audio = new Audio(`explosion${index}.mp3`)
    let volume = randomFloat(0.5, 0.8)
    audio.volume = volume
    audio.play()
}