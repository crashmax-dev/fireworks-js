import type { Fireworks } from './fireworks.js'
import { randomFloat, randomInt } from './helpers.js'

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}

export class Sound {
  private sounds: AudioBuffer[] = []
  private audioContext: AudioContext
  private onInit = false

  constructor(private readonly fw: Fireworks) {
    this.init()
  }

  private get isEnabled() {
    return this.fw.options.sound.enabled
  }

  private get soundOptions() {
    return this.fw.options.sound
  }

  private init(): void {
    if (!this.onInit && this.isEnabled) {
      this.onInit = true
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)()
      this.loadSounds()
    }
  }

  private async loadSounds(): Promise<void> {
    for (const file of this.soundOptions.files) {
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
    if (this.isEnabled && this.sounds.length) {
      const source = this.audioContext.createBufferSource()
      const sound = this.sounds[randomInt(0, this.sounds.length - 1)]!
      const vol = this.audioContext.createGain()

      source.buffer = sound
      vol.gain.value = randomFloat(
        this.soundOptions.volume.min / 100,
        this.soundOptions.volume.max / 100
      )
      vol.connect(this.audioContext.destination)
      source.connect(vol)
      source.start(0)
    } else {
      this.init()
    }
  }
}
