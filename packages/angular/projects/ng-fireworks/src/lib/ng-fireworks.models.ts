import type { FireworksOptions } from 'fireworks-js'
import { InjectionToken } from '@angular/core'

export type FireworksProps = Omit<FireworksOptions, 'autoresize'>
export const FIREWORKS_PROPS = new InjectionToken<FireworksProps>('options')
