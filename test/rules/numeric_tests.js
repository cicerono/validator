import test from 'ava'

import { numeric } from '../../src/rules'

test('numeric should return null for integer values', t => {
  t.is(numeric('field', 0), null)
  t.is(numeric('field', 42), null)
  t.is(numeric('field', '42'), null)
})

test('numeric should return null for double values', t => {
  t.is(numeric('field', 4.2), null)
  t.is(numeric('field', '4.2'), null)
})

test('numeric should return null for integer values when integerOnly is null', t => {
  t.is(numeric('field', 0, { integerOnly: null }), null)
  t.is(numeric('field', 42, { integerOnly: null }), null)
  t.is(numeric('field', '42', { integerOnly: null }), null)
})

test('numeric should return null for double values with custom delimiter', t => {
  t.is(numeric('field', '4,2', { delimiter: ',' }), null)
})

test('numeric should return null for empty string', t => {
  t.is(numeric('field', ''), null)
})

test('numeric should return null for null', t => {
  t.is(numeric('field', null), null)
})

test('numeric should return null for undefined', t => {
  t.is(numeric('field', undefined), null)
})

test('numeric should return "numeric" letters', t => {
  t.is(numeric('field', 'not a number'), 'numeric')
})

test('numeric should return "numeric" for spaces', t => {
  t.is(numeric('field', '  '), 'numeric')
})

test('numeric should validate max value', t => {
  t.is(numeric('field', 41, { max: 42 }), null)
  t.is(numeric('field', 42, { max: 42 }), null)
  t.is(numeric('field', 41.9, { max: 42 }), null)
  t.is(numeric('field', 43, { max: 42 }), 'numeric/max')
  t.is(numeric('field', 42.1, { max: 42 }), 'numeric/max')
})

test('numeric should validate min value', t => {
  t.is(numeric('field', 43, { min: 42 }), null)
  t.is(numeric('field', 42, { min: 42 }), null)
  t.is(numeric('field', 42.1, { min: 42 }), null)
  t.is(numeric('field', 41.9, { min: 42 }), 'numeric/min')
  t.is(numeric('field', 41, { min: 42 }), 'numeric/min')
})
