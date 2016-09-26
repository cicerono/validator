import test from 'ava';

import sumArray from '../sumArray';

test('rules.sumArray should return "sumArray.exact" for invalid exact', t => {
  t.is(sumArray('field', [0, 1, 2], { exact: 4 }), 'sumArray.exact');
  t.is(sumArray(
    'field',
    [{ value: 0 }, { value: 1 }, { value: 2 }],
    { exact: 4, field: 'value' }
  ), 'sumArray.exact');
});

test('rules.sumArray should return "sumArray.min" for invalid min', t => {
  t.is(sumArray('field', [0], { min: 2, max: 4 }), 'sumArray.min');
  t.is(sumArray(
    'field',
    [{ value: 0 }, { value: 1 }],
      { min: 2, max: 4, field: 'value' }
    ), 'sumArray.min');
});

test('rules.sumArray should return "sumArray.max" for invalid max', t => {
  t.is(sumArray('field', [0, 1, 4], { min: 2, max: 4 }), 'sumArray.max');
  t.is(sumArray(
    'field',
    [{ value: 0 }, { value: 1 }, { value: 4 }],
    { min: 2, max: 4, field: 'value' }
  ), 'sumArray.max');
});

test('rules.sumArray should return null for unapplicable data type', t => {
  t.is(sumArray('field', 'value', { exact: 100 }), 'sumArray');
  t.is(sumArray('field', 123, { exact: 100 }), 'sumArray');
  t.is(sumArray('field', {}, { exact: 100 }), 'sumArray');
});

test('rules.sumArray should return null for valid exact', t => {
  t.is(sumArray('field', [0, 1, 2], { exact: 3 }), null);
  t.is(sumArray(
    'field',
    [{ value: 0 }, { value: 1 }, { value: 2 }],
    { exact: 3, field: 'value' }
  ), null);
});

test('rules.sumArray should return null for valid min/max', t => {
  t.is(sumArray('field', [0, 1, 2], { min: 2, max: 4 }), null);
  t.is(sumArray(
    'field',
    [{ value: 0 }, { value: 1 }, { value: 2 }],
    { min: 2, max: 4, field: 'value' }
  ), null);
});
