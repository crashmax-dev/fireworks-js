import { SoundOptions } from './fireworks'
import { randomInteger, randomFloat } from './utils'

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}

export class Sound {
  public options: Required<SoundOptions>
  private _buffer: AudioBuffer[] = []
  private _audioContext: AudioContext

  constructor(options: SoundOptions | undefined) {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    this._audioContext = new AudioContext()

    this.options = {
      enable: false,
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

    if (this.options.enable) {
      this.load()
    }
  }

  private async load(): Promise<void> {
    for (const file of this.options.files) {
      const response = await (
        await fetch(file)
      ).arrayBuffer()

      this._audioContext.decodeAudioData(response, (buffer: AudioBuffer) => {
        this._buffer.push(buffer)
      })
    }
  }

  async play(): Promise<void> {
    if (this.options.enable) {
      if (this._buffer.length) {
        const source = this._audioContext.createBufferSource()
        const buffer = this._buffer[randomInteger(0, this._buffer.length - 1)]
        const volume = this._audioContext.createGain()

        source.buffer = buffer
        volume.gain.value = randomFloat(this.options.volume.min / 100, this.options.volume.max / 100)
        volume.connect(this._audioContext.destination)
        source.connect(volume)
        source.start(0)
      } else {
        await this.load()
      }
    }
  }
}