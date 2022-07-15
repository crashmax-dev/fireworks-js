import test from 'ava'
import { randomInt } from '../src/helpers.js'

test('randomInt', (t) => {
  t.is(randomInt(0, 0), 0)
})
