import test from 'ava';

import { length } from '../';

test('rules.length should return null accepted values', t => {
  t.is(length('field', '0', { min: 1, max: 1 }), null);
  t.is(length('field', null, { min: 1, max: 1 }), null);
  t.is(length('field', undefined, { min: 1, max: 1 }), null);
  t.is(length('field', '', { min: 1, max: 1 }), null);
});

test('rules.length should return "length.min" when value is to short', t => {
  t.is(length('field', '00', { min: 3 }), 'length.min');
});

test('rules.length should return "length.max" when value is to long', t => {
  t.is(length('field', '00', { max: 1 }), 'length.max');
});

test('rules.length should return "length.max" when value is longer than exact', t => {
  t.is(length('field', '00', { exact: 1 }), 'length.max');
});

test('rules.length should return "length.min" when value is shorter than exact', t => {
  t.is(length('field', '00', { exact: 3 }), 'length.min');
});
