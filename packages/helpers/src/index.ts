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
