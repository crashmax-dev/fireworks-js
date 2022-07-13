export type LineStyle = 'round' | 'square'

export interface IFireworksOptions {
  hue: MinMaxValues
  rocketsPoint: MinMaxValues
  opacity: number
  acceleration: number
  friction: number
  gravity: number
  particles: number
  trace: number
  explosion: number
  mouse: IMouse
  boundaries: IBoundaries
  sound: ISounds
  delay: MinMaxValues
  brightness: IBrightness
  flickering: number
  intensity: number
  traceSpeed: number
  lineWidth: LineWidth
  lineStyle: LineStyle
  autoresize: boolean
}

export type FireworksOptions = RecursivePartial<IFireworksOptions>

export interface IBrightness extends MinMaxValues {
  decay: MinMaxValues
}

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
  volume: MinMaxValues
}

export interface LineWidth {
  explosion: MinMaxValues
  trace: MinMaxValues
}

export interface MinMaxValues {
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
  brightness: IBrightness
}

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P]
}
