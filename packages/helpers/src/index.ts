export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function randomInt(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

export function getDistance(x: number, y: number, dx: number, dy: number): number {
  const pow = Math.pow
  return Math.sqrt(pow(x - dx, 2) + pow(y - dy, 2))
}

export function hsla(hue: number, light: number, alpha = 1): string {
  if (hue > 255 || hue < 0) {
    throw new Error('')
  }

  if (light > 100 || light < 0) {
    throw new Error('')
  }

  if (alpha > 1 || alpha < 0) {
    throw new Error('')
  }

  return `hsla(${hue}, 100%, ${light}%, ${alpha})`
}
