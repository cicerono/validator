import test from 'ava'

import { numeric } from '../../src/rules'

test('numeric should return true for integer values', t => {
  t.ok(numeric('field', 0))
  t.ok(numeric('field', 42))
  t.ok(numeric('field', '42'))
})

test('numeric should return true for double values', t => {
  t.ok(numeric('field', 4.2))
  t.ok(numeric('field', '4.2'))
})

test('numeric should return true for integer values when integerOnly is true', t => {
  t.ok(numeric('field', 0, { integerOnly: true }))
  t.ok(numeric('field', 42, { integerOnly: true }))
  t.ok(numeric('field', '42', { integerOnly: true }))
})

test('numeric should return true for double values with custom delimiter', t => {
  t.ok(numeric('field', '4,2', { delimiter: ',' }))
})

test('numeric should return true for empty string', t => {
  t.ok(numeric('field', ''))
})

test('numeric should return true for null', t => {
  t.ok(numeric('field', null))
})

test('numeric should return true for undefined', t => {
  t.ok(numeric('field', undefined))
})

test('numeric should return false letters', t => {
  t.notOk(numeric('field', 'not a number'))
})

test('numeric should return false for spaces', t => {
  t.notOk(numeric('field', '  '))
})

test('numeric should validate max value', t => {
  t.ok(numeric('field', 41, { max: 42 }))
  t.ok(numeric('field', 42, { max: 42 }))
  t.ok(numeric('field', 41.9, { max: 42 }))
  t.notOk(numeric('field', 43, { max: 42 }))
  t.notOk(numeric('field', 42.1, { max: 42 }))
})

test('numeric should validate min value', t => {
  t.ok(numeric('field', 43, { min: 42 }))
  t.ok(numeric('field', 42, { min: 42 }))
  t.ok(numeric('field', 42.1, { min: 42 }))
  t.notOk(numeric('field', 41.9, { min: 42 }))
  t.notOk(numeric('field', 41, { min: 42 }))
})
