/* eslint-env jest */
import Validator from '../validator';

it('Validator should validate required rules', () => {
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

  expect(result.hasOwnProperty('notRequired')).toBe(false);
  expect(result.hasOwnProperty('present')).toBe(false);

  expect(result.noValue).toEqual({
    field: 'noValue',
    rule: 'required',
    value: null,
    config: { required: true },
  });

  expect(result.notInObject).toEqual({
    field: 'notInObject',
    rule: 'required',
    value: undefined,
    config: { required: true },
  });

  expect(result).toEqual(validator.getErrors());
});
