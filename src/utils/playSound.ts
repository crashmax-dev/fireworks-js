import {
    randomFloat,
    randomInteger
} from './index'

/**
 * 
 * @param min
 * @param max
 */
export function playSound(min: number, max: number, minVol: number, maxVol: number) {
    let index = randomInteger(min, max)
    let audio = new Audio(`explosion${index}.mp3`)
    let volume = randomFloat(minVol / 10, maxVol / 10)
    audio.volume = volume
    audio.play()
}