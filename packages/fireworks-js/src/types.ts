export type LineStyle = 'round' | 'square'

export interface FireworksOptions {
  hue?: MinMaxValues
  rocketsPoint?: MinMaxValues
  opacity?: number
  acceleration?: number
  friction?: number
  gravity?: number
  particles?: number
  trace?: number
  explosion?: number
  mouse?: IMouse
  boundaries?: IBoundaries
  sound?: ISounds
  delay?: MinMaxValues
  brightness?: IBrightness
  flickering?: number
  intensity?: number
  traceSpeed?: number
  lineWidth?: LineWidth
  lineStyle?: LineStyle
  autoresize?: boolean
}

export interface IBrightness extends MinMaxValues {
  decay?: MinMaxValues
}

export interface IMouse {
  click?: boolean
  move?: boolean
  max?: number
}

export interface IBoundaries {
  visible?: boolean
  x?: number
  y?: number
  width?: number
  height?: number
}

export interface ISounds {
  enabled?: boolean
  files?: string[]
  volume?: MinMaxValues
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
  width?: number
  height?: number
}
