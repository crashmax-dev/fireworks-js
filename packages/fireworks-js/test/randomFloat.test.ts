import test from 'ava'
import { randomFloat } from '../src/helpers.js'

test('randomFloat', (t) => {
  t.is(randomFloat(0, 0), 0)
})
