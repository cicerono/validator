/* eslint-env jest */
import sinon from 'sinon';

import Validator from '../validator';
import { UnknownRuleError } from '../errors';

it('creating new Validator', () => {
  expect(new Validator({}) instanceof Validator).toBeTruthy();
});

it('throw if no rules is given to the validator', () => {
  expect(() => new Validator()).toThrowError(Error);
});

it('Validator.getErrors should return validation errors', () => {
  const validator = new Validator({});
  validator.errors = { field: { rule: 'superRule' } };
  expect(validator.getErrors()).toEqual({ field: { rule: 'superRule' } });
});

it('Validator.validate should call validateField', () => {
  const validator = new Validator({});
  sinon.spy(validator, 'validateField');
  expect(validator.validate(['answer'], { answer: 42 })).toEqual({});
  expect(validator.validateField.called).toBeTruthy();
});

it('Validator.validate should reset errors', () => {
  const validator = new Validator({ answer: { required: true } });
  validator.validate(['answer'], { }, {});
  const errors = validator.validate([], { }, {});
  expect(errors).toEqual({});
});

it('Validator.validate should filter out valid values', () => {
  const validator = new Validator({});
  sinon.stub(validator, 'validateField').returns(null);
  expect(validator.validate(['answer'], { answer: 42 })).toEqual({});
});

it('Validator.validateField should not run other validator rules when required fails', () => {
  const validator = new Validator({ answer: { length: { min: 2 } } });
  expect(validator.validateField('answer', '')).toEqual(null);
});

it('Validator.validateField should run other validator rules when required validates', () => {
  const validator = new Validator({ answer: { length: { min: 2 } } });
  expect(validator.validateField('answer', '1').rule).toEqual('length.min');
});

it('Validator.validate should accept data=undefined', () => {
  const validator = new Validator({ answer: { required: true } });
  expect(validator.validate(['answer'], undefined)).toEqual(
    { answer: { field: 'answer', rule: 'required', value: undefined, config: { required: true } } }
  );
});

it('Validator.validate should support nested data structures', () => {
  const validator = new Validator({ 'a.b': { numeric: true } });
  expect(validator.validate(['a.b'], { a: { b: 'd42' } })).toEqual(
    { 'a.b': { field: 'a.b', rule: 'numeric', value: 'd42', config: { numeric: true } } }
  );
});

it('Validator.validateField should return null if field is not in config', () => {
  const validator = new Validator({});
  expect(validator.validateField('answer', 42)).toBe(null);
});

it('Validator.validateField should update errors', () => {
  const validator = new Validator({ a: { required: true }, b: { required: true } });
  validator.validateField('a', null);
  expect(validator.errors).toEqual(
    { a: { field: 'a', rule: 'required', value: null, config: { required: true } } }
  );
  validator.validateField('a', 'c');
  expect(validator.errors).toEqual({});
});

it('Validator.validateField should return object with offending rule name', () => {
  const validator = new Validator({ a: { numeric: { integerOnly: true } } });

  expect(validator.validateField('a', '2.0')).toEqual({
    field: 'a',
    rule: 'numeric.integerOnly',
    value: '2.0',
    config: { numeric: { integerOnly: true } },
  });
});

it('Validator.validateRule should throw UnknownRuleError when it gets an unkown rule', () => {
  expect(() => {
    const validator = new Validator({ a: { none: {} } });
    validator.validateRule('none', 'a', '', {});
  }).toThrowError(UnknownRuleError);
});

it('Validator.validateRule should return null when if return falsy', () => {
  const validator = new Validator({ a: { numeric: { if: ({ b }) => b === 2 } } });
  expect(validator.validateRule('numeric', 'a', 'dd', {})).toBe(null);
});

it('Validator.validateRule should return "numeric" when if of numeric returns true', () => {
  const validator = new Validator({ a: { numeric: { if: () => true } } });
  expect(validator.validateRule('numeric', 'a', 'dd', {}).rule).toBe('numeric');
});

it(
  'Validator.validateRule should return "numeric" when if of numeric returns ' +
  'true based on other field',
  () => {
    const validator = new Validator({ a: { numeric: { if: ({ b }) => b === 2 } } });
    expect(validator.validateRule('numeric', 'a', 'dd', { values: { b: 2 } }).rule).toBe('numeric');
  }
);

it('Validator.validate should flatten error structure if array is returned', () => {
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

  expect(validationOutput).toEqual(expectedOutput);
});

it('Validator.validate should support nesting of rules that return arrays of errors', () => {
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

  expect(validationOutput).toEqual(expectedOutput);
});

it('Validator.validate should not block execution of other rules if it passes', () => {
  const validatorConfig = {
    fields: {
      arrayOf: {
        name: { length: { max: 3 } },
      },
      sumArray: {
        field: 'percentage',
        exact: 100,
      },
    },
  };

  const validationOutput = new Validator(validatorConfig)
    .validate(['fields'], { fields: [
      { name: 'ABC', percentage: 20 },
      { name: 'DEF', percentage: 20 },
      { name: 'GHI', percentage: 20 },
    ] });

  const expectedOutput = {
    fields: {
      field: 'fields',
      rule: 'sumArray.exact',
      value: [
        { name: 'ABC', percentage: 20 },
        { name: 'DEF', percentage: 20 },
        { name: 'GHI', percentage: 20 },
      ],
      config: {
        sumArray: {
          field: 'percentage',
          exact: 100,
        },
        arrayOf: {
          name: { length: { max: 3 } },
        },
      },
    },
  };

  expect(validationOutput).toEqual(expectedOutput);
});
