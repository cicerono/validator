import test from 'ava';

import Validator from '../validator';

test('Validator should validate required rules', t => {
  const validator = new Validator({
    noValue: { required: true },
    present: { required: true },
    notRequired: { required: false },
    notInObject: { required: true },
  });

  const result = validator.validate(['noValue', 'present', 'notRequired', 'notInObject'], {
    noValue: null,
    present: 'present',
    notRequired: '',
  });

  t.deepEqual(result, {
    noValue: {
      field: 'noValue',
      rule: 'required',
      value: null,
      config: { required: true },
    },
    notInObject: {
      field: 'notInObject',
      rule: 'required',
      value: undefined,
      config: { required: true },
    },
  });
  t.deepEqual(result, validator.getErrors());
});
