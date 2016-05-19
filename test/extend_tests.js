import 'babel-core/register'
import test from 'ava'

import extend from '../src/extend'
const newRule = () => {}

test('Validator.extend should extend rules suite', t => {
  t.plan(2)
  const Validator = extend({ newRule })
  t.truthy(Validator.rules.newRule)
  t.is(Validator.rules.newRule, newRule)
})

test('Validator.extend should include default rules', t => {
  t.plan(1)
  const Validator = extend({ newRule })
  t.truthy(Validator.rules.required)
})

test('Validator.extend should overwrite if the rule has same name', t => {
  t.plan(1)
  const Validator = extend({ required: newRule })
  t.is(Validator.rules.required, newRule)
})
