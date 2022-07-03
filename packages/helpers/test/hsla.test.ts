import test from 'ava'
import { hsla, randomFloat } from '../src'

test('hsla', (t) => {
  t.deepEqual(hsla(1, 1), 'hsla(1, 100%, 1%, 1)')
  t.deepEqual(hsla(-1, -1, -1), '')
})

test('randomFloat', (t) => {

})
