import test from 'ava';

import Validator from '../validator';

test('Validator.validate should flatten structure if arrayOf rule is used', t => {
  const validatorConfig = {
    fields: {
      arrayOf: {
        key: { numeric: { integerOnly: true, max: 32 } },
        value: { required: true, length: { max: 5 } },
      },
    },
  };

  const validationOutput = new Validator(validatorConfig)
    .validate(['fields'], { fields: [{ key: 33, value: '1234561' }] });

  const expectedOutput = {
    'fields[0].key': {
      field: 'fields[0].key',
      rule: 'numeric.max',
      value: 33,
      config: { numeric: { integerOnly: true, max: 32 } },
    },
    'fields[0].value': {
      field: 'fields[0].value',
      rule: 'length.max',
      value: '1234561',
      config: { required: true, length: { max: 5 } },
    },
  };

  t.deepEqual(expectedOutput, validationOutput);
});

test('Validator.validate should support nesting of arrayOf rule', t => {
  const validatorConfig = {
    fields: {
      arrayOf: {
        name: { length: { max: 10 } },
        nestedValues: {
          arrayOf: { key: { numeric: true }, value: { length: { min: 3 } } },
        },
      },
    },
  };

  const validationOutput = new Validator(validatorConfig)
    .validate(['fields'], { fields: [
      { name: 'Test 1', nestedValues: [{ key: 'NaN', value: 'Value' }] },
      { name: 'Test 2', nestedValues: [{ key: 0, value: 'Value' }, { key: 1, value: 'Va' }] },
    ] });

  const expectedOutput = {
    'fields[0].nestedValues[0].key': {
      field: 'fields[0].nestedValues[0].key',
      rule: 'numeric',
      value: 'NaN',
      config: { numeric: true },
    },
    'fields[1].nestedValues[1].value': {
      field: 'fields[1].nestedValues[1].value',
      rule: 'length.min',
      value: 'Va',
      config: { length: { min: 3 } },
    },
  };

  t.deepEqual(expectedOutput, validationOutput);
});
