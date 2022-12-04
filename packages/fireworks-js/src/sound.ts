import { randomFloat, randomInt } from './helpers.js'
import type { Options } from './options.js'

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}

export class Sound {
  private buffers: AudioBuffer[] = []
  private audioContext: AudioContext
  private onInit = false

  constructor(private readonly options: Options) {
    this.init()
  }

  private get isEnabled() {
    return this.options.sound.enabled
  }

  private get soundOptions() {
    return this.options.sound
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
          this.buffers.push(buffer)
        })
        .catch((err) => {
          throw err
        })
    }
  }

  play(): void {
    if (this.isEnabled && this.buffers.length) {
      const bufferSource = this.audioContext.createBufferSource()
      const soundBuffer = this.buffers[randomInt(0, this.buffers.length - 1)]!
      const volume = this.audioContext.createGain()

      bufferSource.buffer = soundBuffer
      volume.gain.value = randomFloat(
        this.soundOptions.volume.min / 100,
        this.soundOptions.volume.max / 100
      )
      volume.connect(this.audioContext.destination)
      bufferSource.connect(volume)
      bufferSource.start(0)
    } else {
      this.init()
    }
  }
}
