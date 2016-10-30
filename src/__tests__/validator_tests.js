// @flow
/* eslint-env jest */
import validator from '../index';
import type { ValidatorConfig } from '../types';

describe('Validator(config)', () => {
  it('should filter out valid values', () => {
    expect(validator({})(['answer'], { answer: 42 })).toEqual({});
  });

  it('should not run other validator rules when required fails', () => {
    const result = validator({ answer: { length: { min: 2 } } })(['answer'], { answer: '' });
    expect(result).toEqual({});
  });

  it('should run other validator rules when required validates', () => {
    const result = validator({ answer: { length: { min: 2 } } })(['answer'], { answer: '1' });
    expect(result.answer.rule).toEqual('length.min');
  });

  it('should accept data=undefined', () => {
    const result = validator({ answer: { required: true } })(['answer'], { answer: undefined });
    expect(result).toEqual({
      answer: { field: 'answer', rule: 'required', value: undefined, config: { required: true } },
    });
  });

  it('should support nested data structures', () => {
    const result = validator({ 'a.b': { numeric: { min: 3 } } })(['a.b'], { a: { b: 'd42' } });
    expect(result).toEqual({
      'a.b': { field: 'a.b', rule: 'numeric', value: 'd42', config: { numeric: { min: 3 } } },
    });
  });

  it('should return null if field is not in config', () => {
    const result = validator({})(['answer'], { answer: '1' });
    expect(result).toEqual({});
  });

  it('should throw UnknownRuleError when it gets an unkown rule', () => {
    expect(() => {
      validator({ a: { none: {} } })(['a'], { a: '1' });
    }).toThrowError("Cannot find rule 'none'");
  });

  it('should return no errors when if return falsy', () => {
    const result = validator({ a: { numeric: { if: ({ b }) => b === 2 } } })(['a'], { a: 'dd' });
    expect(result).toEqual({});
  });

  it('should return error when if of numeric returns true', () => {
    const result = validator({ a: { numeric: { if: () => true } } })(['a'], { a: 'dd' });
    expect(result.a.rule).toBe('numeric');
  });

  it('should return "numeric" when if of numeric returns true based on other field', () => {
    const result = validator({ a: { numeric: { if: ({ b }) => b === 2 } } })(
        ['a'],
        { a: 'dd', b: 2 }
      );
    expect(result.a.rule).toBe('numeric');
  });

  it('should flatten error structure if array is returned', () => {
    const validatorConfig = {
      fields: {
        arrayOf: {
          key: { numeric: { integerOnly: true, max: 32 } },
          value: { required: true, length: { max: 5 } },
        },
      },
    };

    const validationOutput = validator(validatorConfig)(
      ['fields'],
      { fields: [{ key: 33, value: '1234561' }] }
    );

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

  it('should support nesting of rules that return arrays of errors', () => {
    const validatorConfig: ValidatorConfig = {
      fields: {
        arrayOf: {
          name: { length: { max: 10 } },
          nestedValues: {
            arrayOf: { key: { numeric: { min: 0 } }, value: { length: { min: 3 } } },
          },
        },
      },
    };

    const validationOutput = validator(validatorConfig)(
      ['fields'],
      { fields: [
        { name: 'Test 1', nestedValues: [{ key: 'NaN', value: 'Value' }] },
        { name: 'Test 2', nestedValues: [{ key: 0, value: 'Value' }, { key: 1, value: 'Va' }] },
      ] }
    );

    const expectedOutput = {
      'fields[0].nestedValues[0].key': {
        field: 'fields[0].nestedValues[0].key',
        rule: 'numeric',
        value: 'NaN',
        config: { numeric: { min: 0 } },
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
});
