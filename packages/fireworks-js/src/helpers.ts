export function floor(num: number): number {
  return Math.abs(Math.floor(num))
}

export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function randomInt(min: number, max: number): number {
  return Math.floor(randomFloat(min, max + 1))
}

export function getDistance(
  x: number,
  y: number,
  dx: number,
  dy: number
): number {
  const pow = Math.pow
  return Math.sqrt(pow(x - dx, 2) + pow(y - dy, 2))
}

export function hsla(hue: number, lightness: number, alpha = 1): string {
  if (hue > 360 || hue < 0) {
    throw new Error(`Expected hue 0-360 range, got \`${hue}\``)
  }

  if (lightness > 100 || lightness < 0) {
    throw new Error(`Expected lightness 0-100 range, got \`${lightness}\``)
  }

  if (alpha > 1 || alpha < 0) {
    throw new Error(`Expected alpha 0-1 range, got \`${alpha}\``)
  }

  return `hsla(${hue}, 100%, ${lightness}%, ${alpha})`
}

/* https://github.com/voodoocreation/ts-deepmerge */
interface IObject {
  [key: string]: any
  length?: never
}

type IUnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

const isObject = (obj: any) => {
  if (typeof obj === 'object' && obj !== null) {
    if (typeof Object.getPrototypeOf === 'function') {
      const prototype = Object.getPrototypeOf(obj)
      return prototype === Object.prototype || prototype === null
    }

    return Object.prototype.toString.call(obj) === '[object Object]'
  }

  return false
}

const PROTECTED_KEYS = [
  '__proto__',
  'constructor',
  'prototype'
]

export const deepMerge = <T extends IObject[]>(
  ...objects: T
): IUnionToIntersection<T[number]> => {
  return objects.reduce((result, current) => {
    Object.keys(current).forEach((key) => {
      if (PROTECTED_KEYS.includes(key)) {
        return
      }

      if (Array.isArray(result[key]) && Array.isArray(current[key])) {
        result[key] = false
          ? Array.from(new Set((result[key] as unknown[]).concat(current[key])))
          : current[key]
      } else if (isObject(result[key]) && isObject(current[key])) {
        result[key] = deepMerge(result[key] as IObject, current[key] as IObject)
      } else {
        result[key] = current[key]
      }
    })

    return result
  }, {}) as any
}

// https://github.com/zero-dependency/utils/blob/master/src/debounce.ts
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => fn(...args), ms)
  }
}
