import test from 'ava';

import { numeric } from '../numeric';

test('numeric should return null for integer values', t => {
  t.is(numeric('field', 0), null);
  t.is(numeric('field', 42), null);
  t.is(numeric('field', '42'), null);
});

test('numeric should return null for double values', t => {
  t.is(numeric('field', 4.2), null);
  t.is(numeric('field', '4.2'), null);
});

test('numeric should return null for integer values when integerOnly is true', t => {
  t.is(numeric('field', 0, { integerOnly: true }), null);
  t.is(numeric('field', 42, { integerOnly: true }), null);
  t.is(numeric('field', '42', { integerOnly: true }), null);
});

test(
  'numeric should return "numeric.integerOnly" for non-integer values when integerOnly is true',
  t => {
    t.is(numeric('field', 42.2, { integerOnly: true }), 'numeric.integerOnly');
    t.is(numeric('field', '42.3', { integerOnly: true }), 'numeric.integerOnly');
  }
);

test('numeric should return null for double values with custom delimiter', t => {
  t.is(numeric('field', '4,2', { delimiter: ',' }), null);
});

test('numeric should return null for empty string', t => {
  t.is(numeric('field', ''), null);
});

test('numeric should return null for null', t => {
  t.is(numeric('field', null), null);
});

test('numeric should return null for undefined', t => {
  t.is(numeric('field', undefined), null);
});

test('numeric should return "numeric" letters', t => {
  t.is(numeric('field', 'not a number'), 'numeric');
});

test('numeric should return "numeric" for spaces', t => {
  t.is(numeric('field', '  '), 'numeric');
});

test('numeric should validate max value', t => {
  t.is(numeric('field', 0, { max: 0 }), null);
  t.is(numeric('field', 41, { max: 42 }), null);
  t.is(numeric('field', 42, { max: 42 }), null);
  t.is(numeric('field', 41.9, { max: 42 }), null);
  t.is(numeric('field', 43, { max: 42 }), 'numeric.max');
  t.is(numeric('field', 42.1, { max: 42 }), 'numeric.max');
  t.is(numeric('field', '43', { max: 42 }), 'numeric.max');
});

test('numeric should validate min value', t => {
  t.is(numeric('field', 0, { min: 0 }), null);
  t.is(numeric('field', 43, { min: 42 }), null);
  t.is(numeric('field', 42, { min: 42 }), null);
  t.is(numeric('field', 42.1, { min: 42 }), null);
  t.is(numeric('field', 41.9, { min: 42 }), 'numeric.min');
  t.is(numeric('field', 41, { min: 42 }), 'numeric.min');
  t.is(numeric('field', '41', { min: 42 }), 'numeric.min');
});

test('numeric should validate max value when set by other field', t => {
  t.is(numeric('field', 2, { max: { field: 'a' }, values: {} }), null);
  t.is(numeric('field', 2, { max: { field: 'a' }, values: { a: '' } }), null);
  t.is(numeric('field', 2, { max: { field: 'a' }, values: { a: null } }), null);
  t.is(numeric('field', 1, { max: { field: 'a' }, values: { a: 2 } }), null);
  t.is(numeric('field', 1, { max: { field: 'a' }, values: { a: '2' } }), null);
  t.is(numeric('field', '1', { max: { field: 'a' }, values: { a: 2 } }), null);
  t.is(numeric('field', '3', { max: { field: 'a' }, values: { a: '250000' } }), null);
  t.is(numeric('field', 2, { max: { field: 'a' }, values: { a: 1 } }), 'numeric.max.field');
});


test('numeric should validate min value when set by other field', t => {
  t.is(numeric('field', 2, { min: { field: 'a' }, values: {} }), null);
  t.is(numeric('field', 2, { min: { field: 'a' }, values: { a: '' } }), null);
  t.is(numeric('field', 2, { min: { field: 'a' }, values: { a: null } }), null);
  t.is(numeric('field', 2, { min: { field: 'a' }, values: { a: 1 } }), null);
  t.is(numeric('field', 2, { min: { field: 'a' }, values: { a: '1' } }), null);
  t.is(numeric('field', '2', { min: { field: 'a' }, values: { a: 1 } }), null);
  t.is(numeric('field', 2, { min: { field: 'a' }, values: { a: 3 } }), 'numeric.min.field');
});
