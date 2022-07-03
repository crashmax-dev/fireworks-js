import test from 'ava'
import { hsla } from '../src/index.js'

test('hsla', (t) => {
  t.is(hsla(1, 0, 0), 'hsla(1, 100%, 0%, 0)')
  t.is(hsla(0, 1, 0), 'hsla(0, 100%, 1%, 0)')
  t.is(hsla(0, 0, 1), 'hsla(0, 100%, 0%, 1)')

  const instanceError = {
    instanceOf: Error
  }

  const throwHue = t.throws(() => {
    hsla(-1, 0, 0)
  }, instanceError)

  const throwBrightness = t.throws(() => {
    hsla(0, -1, 0)
  }, instanceError)

  const throwAlpha = t.throws(() => {
    hsla(0, 0, -1)
  }, instanceError)

  t.is(throwHue!.message, 'Expected hue 0-255 range, got `-1`')
  t.is(throwBrightness!.message, 'Expected brightness 0-100 range, got `-1`')
  t.is(throwAlpha!.message, 'Expected alpha 0-1 range, got `-1`')
})
