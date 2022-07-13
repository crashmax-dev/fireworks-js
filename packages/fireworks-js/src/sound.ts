import { randomFloat, randomInt } from './helpers.js'
import { opts } from './options.js'

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}

export class Sound {
  private sounds: AudioBuffer[] = []
  private audioContext: AudioContext
  private onInit = false

  constructor() {
    this.init()
  }

  private init(): void {
    if (!this.onInit && opts.sound.enabled) {
      this.onInit = true
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)()
      this.loadSounds()
    }
  }

  private async loadSounds(): Promise<void> {
    for (const file of opts.sound.files) {
      const response = await (await fetch(file)).arrayBuffer()

      this.audioContext
        .decodeAudioData(response)
        .then((buffer) => {
          this.sounds.push(buffer)
        })
        .catch((err) => {
          throw err
        })
    }
  }

  play(): void {
    if (opts.sound.enabled && this.sounds.length) {
      const source = this.audioContext.createBufferSource()
      const sound = this.sounds[randomInt(0, this.sounds.length - 1)]!
      const vol = this.audioContext.createGain()

      source.buffer = sound
      vol.gain.value = randomFloat(
        opts.sound.volume.min / 100,
        opts.sound.volume.max / 100
      )
      vol.connect(this.audioContext.destination)
      source.connect(vol)
      source.start(0)
    } else {
      this.init()
    }
  }
}
