/* eslint-env jest */
import Validator from '../validator';

it('Validator.validateMultiple should validate multiple data sets', () => {
  const config = { a: { required: true, numeric: { min: 200 } } };
  const validator = new Validator(config);
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

  const result = validator.validateMultiple(['a'], data);

  expect(result).toEqual(expected);
});
