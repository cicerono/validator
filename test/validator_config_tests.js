import test from 'ava'

import Validator from '../src/validator'

test('Validator should validate required rules', t => {
  t.plan(1)
  const validator = new Validator({
    noValue: { required: true },
    present: { required: true },
    notRequired: { required: false },
    ignored: { required: true },
  })
  const result = validator.validate(['noValue', 'present', 'notRequired', 'ignored'], {
    noValue: null,
    present: 'present',
    notRequired: '',
    ignored: '',
  }, ['ignored'])

  t.same(result, { noValue: { field: 'noValue', rule: 'required', value: null } })
})
