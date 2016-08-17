import test from 'ava';
import sinon from 'sinon';

import Validator from '../validator';
import { UnknownRuleError } from '../errors';

test('creating new Validator', t => {
  t.truthy(new Validator({}) instanceof Validator);
});

test('throw if no rules is given to the validator', t => {
  t.throws(() => new Validator(), Error, 'Missing validator configuration');
});

test('Validator.getErrors should return validation errors', t => {
  const validator = new Validator({});
  validator.errors = { field: { rule: 'superRule' } };
  t.deepEqual(validator.getErrors(), { field: { rule: 'superRule' } });
});

test('Validator.validate should call validateField', t => {
  const validator = new Validator({});
  sinon.spy(validator, 'validateField');
  t.deepEqual(validator.validate(['answer'], { answer: 42 }), {});
  t.truthy(validator.validateField.called);
});

test('Validator.validate should reset errors', t => {
  const validator = new Validator({ answer: { required: true } });
  validator.validate(['answer'], { }, {});
  const errors = validator.validate([], { }, {});
  t.deepEqual(errors, {});
});

test('Validator.validate should filter out valid values', t => {
  const validator = new Validator({});
  sinon.stub(validator, 'validateField').returns(null);
  t.deepEqual(validator.validate(['answer'], { answer: 42 }), {});
});

test('Validator.validateField should not run other validator rules when required fails', t => {
  const validator = new Validator({ answer: { length: { min: 2 } } });
  t.deepEqual(validator.validateField('answer', ''), null);
});

test('Validator.validateField should run other validator rules when required validates', t => {
  const validator = new Validator({ answer: { length: { min: 2 } } });
  t.deepEqual(validator.validateField('answer', '1').rule, 'length.min');
});

test('Validator.validate should accept data=undefined', t => {
  const validator = new Validator({ answer: { required: true } });
  t.deepEqual(
    validator.validate(['answer'], undefined),
    { answer: { field: 'answer', rule: 'required', value: undefined, config: { required: true } } }
  );
});

test('Validator.validate should support nested data structures', t => {
  const validator = new Validator({ 'a.b': { numeric: true } });
  t.deepEqual(
    validator.validate(['a.b'], { a: { b: 'd42' } }),
    { 'a.b': { field: 'a.b', rule: 'numeric', value: 'd42', config: { numeric: true } } }
  );
});

test('Validator.validateField should return null if field is not in config', t => {
  const validator = new Validator({});
  t.is(validator.validateField('answer', 42), null);
});

test('Validator.validateField should update errors', t => {
  const validator = new Validator({ a: { required: true }, b: { required: true } });
  validator.validateField('a', null);
  t.deepEqual(
    validator.errors,
    { a: { field: 'a', rule: 'required', value: null, config: { required: true } } },
  );
  validator.validateField('a', 'c');
  t.deepEqual(validator.errors, {});
});

test('Validator.validateField should return object with offending rule name', t => {
  const validator = new Validator({ a: { numeric: { integerOnly: true } } });

  t.deepEqual(
    validator.validateField('a', '2.0'),
    {
      field: 'a',
      rule: 'numeric.integerOnly',
      value: '2.0',
      config: { numeric: { integerOnly: true } },
    }
  );
});

test('Validator.validateRule should throw UnknownRuleError when it gets an unkown rule', t => {
  t.throws(() => {
    const validator = new Validator({ a: { none: {} } });
    validator.validateRule('none', 'a', '', {});
  }, UnknownRuleError, 'Cannot find rule \'none\'');
});

test('Validator.validateRule should return null when if return falsy', t => {
  const validator = new Validator({ a: { numeric: { if: ({ b }) => b === 2 } } });
  t.is(validator.validateRule('numeric', 'a', 'dd', {}), null);
});

test('Validator.validateRule should return "numeric" when if of numeric returns true', t => {
  const validator = new Validator({ a: { numeric: { if: () => true } } });
  t.is(validator.validateRule('numeric', 'a', 'dd', {}).rule, 'numeric');
});

test(
  'Validator.validateRule should return "numeric" when if of numeric returns ' +
  'true based on other field',
  t => {
    const validator = new Validator({ a: { numeric: { if: ({ b }) => b === 2 } } });
    t.is(validator.validateRule('numeric', 'a', 'dd', { values: { b: 2 } }).rule, 'numeric');
  }
);

test('Validator.validate should flatten error structure if array is returned', t => {
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

test('Validator.validate should support nesting of rules that return arrays of errors', t => {
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

