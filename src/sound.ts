import { SoundOptions } from './fireworks'
import { randomInt, randomFloat } from './helpers'

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}

export class Sound {
  public options: Required<SoundOptions>
  private _buffer: AudioBuffer[] = []
  private _audioContext: AudioContext
  private onInit = true

  constructor(options: SoundOptions | undefined) {
    this._audioContext = new (window.AudioContext || window.webkitAudioContext)()

    this.options = {
      enabled: false,
      files: [
        'explosion0.mp3',
        'explosion1.mp3',
        'explosion2.mp3'
      ],
      volume: {
        min: 4,
        max: 8
      },
      ...options
    }

    this.init()
  }

  private init(): void {
    if (this.onInit && this.options.enabled) {
      this.onInit = false
      void this.load()
    }
  }

  private async load(): Promise<void> {
    for (const file of this.options.files) {
      const response = await (
        await fetch(file)
      ).arrayBuffer()

      this._audioContext.decodeAudioData(response)
        .then(buffer => {
          this._buffer.push(buffer)
        }).catch(err => {
          throw err
        })
    }
  }

  play(): void {
    if (this.options.enabled && this._buffer.length) {
      const source = this._audioContext.createBufferSource()
      const buffer = this._buffer[randomInt(0, this._buffer.length - 1)]
      const volume = this._audioContext.createGain()

      source.buffer = buffer
      volume.gain.value = randomFloat(this.options.volume.min / 100, this.options.volume.max / 100)
      volume.connect(this._audioContext.destination)
      source.connect(volume)
      source.start(0)
    } else {
      this.init()
    }
  }
}