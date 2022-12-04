import type { Fireworks } from './fireworks.js'

export type LineStyle = 'round' | 'square'

export interface IFireworksOptions {
  hue: MinMax
  rocketsPoint: MinMax
  opacity: number
  acceleration: number
  friction: number
  gravity: number
  particles: number
  explosion: number
  mouse: IMouse
  boundaries: IBoundaries
  sound: ISounds
  delay: MinMax
  brightness: MinMax
  decay: MinMax
  flickering: number
  intensity: number
  traceLength: number
  traceSpeed: number
  lineWidth: LineWidth
  lineStyle: LineStyle
  autoresize: boolean
}

export type FireworksOptions = RecursivePartial<IFireworksOptions>

export interface IMouse {
  click: boolean
  move: boolean
  max: number
}

export interface IBoundaries {
  x: number
  y: number
  width: number
  height: number
}

export interface ISounds {
  enabled: boolean
  files: string[]
  volume: MinMax
}

export interface LineWidth {
  explosion: MinMax
  trace: MinMax
}

export interface MinMax {
  min: number
  max: number
}

export interface Sizes {
  width: number
  height: number
}

export interface TraceOptions {
  x: number
  y: number
  dx: number
  dy: number
  ctx: CanvasRenderingContext2D
  hue: number
  speed: number
  acceleration: number
  traceLength: number
}

export interface ExplosionOptions {
  x: number
  y: number
  ctx: CanvasRenderingContext2D
  hue: number
  friction: number
  gravity: number
  explosionLength: number
  flickering: boolean
  lineWidth: number
  brightness: MinMax
  decay: MinMax
}

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P]
}

export interface FireworksHandlers
  extends Pick<
    Fireworks,
    | 'isRunning'
    | 'start'
    | 'launch'
    | 'pause'
    | 'clear'
    | 'updateOptions'
    | 'updateBoundaries'
    | 'updateSize'
    | 'currentOptions'
  > {
  waitStop(): Promise<void>
  stop(): void
}
