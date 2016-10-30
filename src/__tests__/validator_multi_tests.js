// @flow
/* eslint-env jest */
import validator from '../index';
import type { ValidatorConfig } from '../types';

it('Validator.validateMultiple should validate multiple data sets', () => {
  const config: ValidatorConfig = { a: { required: true, numeric: { min: 200 } } };
  const validate = validator(config);
  const data = {
    first: { a: 100 },
    second: { a: 2000 },
    third: { b: true },
  };
  const expected = {
    first: {
      a: { field: 'a', rule: 'numeric.min', value: 100, config: config.a },
    },
    second: {},
    third: {
      a: { field: 'a', value: undefined, rule: 'required', config: config.a },
    },
  };

  const result = validate.multiple(['a'], data);

  expect(result).toEqual(expected);
});
