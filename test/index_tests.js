import test from 'ava'

import Validator from '../src/validator'
import extend from '../src/extend'
import rules from '../src/rules'

test('should export Validator', t => {
  t.is(require('../src/index').Validator, Validator)
})

test('should export extender', t => {
  t.is(require('../src/index').extend, extend)
})

test('should export rules', t => {
  t.is(require('../src/index').rules, rules)
})
