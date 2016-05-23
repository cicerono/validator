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

test('getErrors should return validation errors', t => {
  const validator = new Validator({});
  validator.errors = { field: { rule: 'superRule' } };
  t.deepEqual(validator.getErrors(), { field: { rule: 'superRule' } });
});

test('validateField should return null if field is not in config', t => {
  const validator = new Validator({});
  t.is(validator.validateField('answer', 42), null);
});

test('validate should call validateField', t => {
  const validator = new Validator({});
  sinon.spy(validator, 'validateField');
  t.deepEqual(validator.validate(['answer'], { answer: 42 }), {});
  t.truthy(validator.validateField.called);
});

test('validate should filter out valid values', t => {
  const validator = new Validator({});
  sinon.stub(validator, 'validateField').returns(null);
  t.deepEqual(validator.validate(['answer'], { answer: 42 }), {});
});

test('validateField should update errors', t => {
  const validator = new Validator({ a: { required: true }, b: { required: true } });
  validator.validateField('a', null);
  t.deepEqual(
    validator.errors,
    { a: { field: 'a', rule: 'required', value: null, config: { required: true } } },
  );
  validator.validateField('a', 'c');
  t.deepEqual(validator.errors, {});
});

test('validateField should return object with offending rule name', t => {
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

test('validateRule should throw UnknownRuleError when it gets an unkown rule', t => {
  t.throws(() => {
    const validator = new Validator({ a: { none: {} } });
    validator.validateRule('none', 'a', '', {});
  }, UnknownRuleError, 'Cannot find rule \'none\'');
});

test('validateRule should return null when if return falsy', t => {
  const validator = new Validator({});
  t.is(validator.validateRule('required', 'a', '', { if: ({ b }) => b === 2 }), null);
});

test('validateRule should return "required" when if of required returns true', t => {
  const defaults = ['required', 'a', ''];
  const validator = new Validator({});
  t.is(validator.validateRule(...defaults, { if: () => true }), 'required');
  t.is(
    validator.validateRule(...defaults, { if: ({ b }) => b === 2, values: { b: 2 } }),
    'required'
  );
});
