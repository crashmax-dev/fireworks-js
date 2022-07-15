import test from 'ava'
import { getDistance } from '../src/helpers.js'

test('getDistance', (t) => {
  t.is(getDistance(10, 10, 10, 10), 0)
  t.is(getDistance(8, 10, 10, 10), 2)
  t.is(getDistance(8, 8, 10, 8), 2)
  t.is(getDistance(8, 8, 8, 10), 2)
  t.is(getDistance(8, 10, 10, 8.5), 2.5)
})
