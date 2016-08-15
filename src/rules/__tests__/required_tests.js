import test from 'ava';

import required from '../required';

test('rules.required should return "required" for null value', t => {
  t.is(required('field', null), 'required');
});

test('rules.required should return "required" for undefined value', t => {
  t.is(required('field', undefined), 'required');
});

test('rules.required should return "required" for empty string', t => {
  t.is(required('field', ''), 'required');
});

test('rules.required should return "required" for string with only spaces', t => {
  t.is(required('field', '   '), 'required');
});

test('rules.required should return "required" for empty array', t => {
  t.is(required('field', []), 'required');
});

test('rules.required should return null for string', t => {
  t.is(required('field', 'value'), null);
});

test('rules.required should return null for number', t => {
  t.is(required('field', 0), null);
  t.is(required('field', 42), null);
});

test('rules.required should return null for non-empty-array', t => {
  t.is(required('field', [42]), null);
});

test('rules.required should return null for boolean values', t => {
  t.is(required('field', true), null);
  t.is(required('field', false), null);
});
