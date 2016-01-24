import test from 'ava'

import { required } from '../../src/rules'

test('rules.required should return false for null value', t => {
  t.notOk(required('field', null))
})

test('rules.required should return false for undefined value', t => {
  t.notOk(required('field', undefined))
})

test('rules.required should return false for empty string', t => {
  t.notOk(required('field', ''))
})

test('rules.required should return false for string with only spaces', t => {
  t.notOk(required('field', '   '))
})

test('rules.required should return true for null value when options is false', t => {
  t.ok(required('field', null, false))
})

test('rules.required should return true for string', t => {
  t.ok(required('field', 'value'))
})

test('rules.required should return true for number', t => {
  t.ok(required('field', 42))
})
