import test from 'ava'
import sinon from 'sinon'

import * as rules from '../src/rules'
import Validator from '../src/validator'

test('creating new Validator', t => {
  t.plan(1)
  t.ok(new Validator({}) instanceof Validator)
})

test('throw if no rules is given to the validator', t => {
  t.plan(1)
  t.throws(() => new Validator(), Error, 'Missing validator configuration')
})

test('getErrors should return validation errors', t => {
  t.plan(1)
  const validator = new Validator({})
  validator.errors = { field: { rule: 'superRule' } }
  t.same(validator.getErrors(), { field: { rule: 'superRule' } })
})

test('validateField should return null if field is not in config', t => {
  t.plan(1)
  const validator = new Validator({})
  t.is(validator.validateField('answer', 42), null)
})

test('validate should call validateField', t => {
  const validator = new Validator({})
  sinon.spy(validator, 'validateField')
  t.same(validator.validate(['answer'], { answer: 42 }), {})
  t.ok(validator.validateField.called)
})

test('validate should filter out valid values', t => {
  const validator = new Validator({})
  sinon.stub(validator, 'validateField').returns(null)
  t.same(validator.validate(['answer'], { answer: 42 }), {})
})

test.skip('validateField should call given rule', t => {
  t.plan(2)
  sinon.spy(rules, 'required')
  const validator = new Validator({ answer: { required: true } })
  t.notOk(validator.validateField('answer', null))
  t.ok(rules.required.called)
})

test('validateField should update errors', t => {
  const validator = new Validator({ a: { required: true }, b: { required: true } })
  validator.validateField('a', null)
  t.same(validator.errors, { a: { field: 'a', rule: 'required', value: null } })
  validator.validateField('a', 'c')
  t.same(validator.errors, {})
})
