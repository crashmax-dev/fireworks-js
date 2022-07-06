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
  mouse?: Mouse
  boundaries?: Boundaries
  sound?: Sounds
  delay?: MinMaxValues
  brightness?: Brightness
  flickering?: number
  intensity?: number
  traceSpeed?: number
  lineWidth?: LineWidth
  lineStyle?: LineStyle
}

export interface Brightness extends MinMaxValues {
  decay?: MinMaxValues
}

export interface Mouse {
  click?: boolean
  move?: boolean
  max?: number
}

export interface Boundaries {
  visible?: boolean
  x?: number
  y?: number
  width?: number
  height?: number
}

export interface Sounds {
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