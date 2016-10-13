/* eslint-env jest */
import numeric from '../numeric';

it('numeric should return null for integer values', () => {
  expect(numeric('field', 0)).toBe(null);
  expect(numeric('field', 42)).toBe(null);
  expect(numeric('field', '42')).toBe(null);
});

it('numeric should return null for double values', () => {
  expect(numeric('field', 4.2)).toBe(null);
  expect(numeric('field', '4.2')).toBe(null);
});

it('numeric should return null for integer values when integerOnly is true', () => {
  expect(numeric('field', 0, { integerOnly: true })).toBe(null);
  expect(numeric('field', 42, { integerOnly: true })).toBe(null);
  expect(numeric('field', '42', { integerOnly: true })).toBe(null);
});

it('numeric should validate non-integer values when limits are non-integers', () => {
  expect(numeric('field', 0.0, { integerOnly: false, min: 0, max: 0.4 })).toBe(null);
  expect(numeric('field', 42.5, { integerOnly: false, min: 42.1, max: 42.8 })).toBe(null);
  expect(numeric('field', '42.5', { integerOnly: false, min: 42.1, max: 42.8 })).toBe(null);
  expect(
    numeric('field', '9999999999.5', { integerOnly: false, min: 0, max: 9999999999.99 })
  ).toBe(null);
});

it(
  'numeric should return "numeric.integerOnly" for non-integer values when integerOnly is true',
  () => {
    expect(numeric('field', 42.2, { integerOnly: true })).toBe('numeric.integerOnly');
    expect(numeric('field', '42.3', { integerOnly: true })).toBe('numeric.integerOnly');
  }
);

it('numeric should return null for double values with custom delimiter', () => {
  expect(numeric('field', '4,2', { delimiter: ',' })).toBe(null);
});

it('numeric should return "numeric" letters', () => {
  expect(numeric('field', 'not a number')).toBe('numeric');
});

it('numeric should return "numeric" for spaces', () => {
  expect(numeric('field', '  ')).toBe('numeric');
});

it('numeric should validate max value', () => {
  expect(numeric('field', 0, { max: 0 })).toBe(null);
  expect(numeric('field', 41, { max: 42 })).toBe(null);
  expect(numeric('field', 42, { max: 42 })).toBe(null);
  expect(numeric('field', 41.9, { max: 42 })).toBe(null);
  expect(numeric('field', 43, { max: 42 })).toBe('numeric.max');
  expect(numeric('field', 42.1, { max: 42 })).toBe('numeric.max');
  expect(numeric('field', '43', { max: 42 })).toBe('numeric.max');
});

it('numeric should validate min value', () => {
  expect(numeric('field', 0, { min: 0 })).toBe(null);
  expect(numeric('field', 43, { min: 42 })).toBe(null);
  expect(numeric('field', 42, { min: 42 })).toBe(null);
  expect(numeric('field', 42.1, { min: 42 })).toBe(null);
  expect(numeric('field', 41.9, { min: 42 })).toBe('numeric.min');
  expect(numeric('field', 41, { min: 42 })).toBe('numeric.min');
  expect(numeric('field', '41', { min: 42 })).toBe('numeric.min');
});

it('numeric should validate max value when set by other field', () => {
  expect(numeric('field', 2, { max: { field: 'a' }, values: {} })).toBe(null);
  expect(numeric('field', 2, { max: { field: 'a' }, values: { a: '' } })).toBe(null);
  expect(numeric('field', 2, { max: { field: 'a' }, values: { a: null } })).toBe(null);
  expect(numeric('field', 1, { max: { field: 'a' }, values: { a: 2 } })).toBe(null);
  expect(numeric('field', 1, { max: { field: 'a' }, values: { a: '2' } })).toBe(null);
  expect(numeric('field', '1', { max: { field: 'a' }, values: { a: 2 } })).toBe(null);
  expect(numeric('field', '3', { max: { field: 'a' }, values: { a: '250000' } })).toBe(null);
  expect(numeric('field', 2, { max: { field: 'a' }, values: { a: 1 } })).toBe('numeric.max.field');
});


it('numeric should validate min value when set by other field', () => {
  expect(numeric('field', 2, { min: { field: 'a' }, values: {} })).toBe(null);
  expect(numeric('field', 2, { min: { field: 'a' }, values: { a: '' } })).toBe(null);
  expect(numeric('field', 2, { min: { field: 'a' }, values: { a: null } })).toBe(null);
  expect(numeric('field', 2, { min: { field: 'a' }, values: { a: 1 } })).toBe(null);
  expect(numeric('field', 2, { min: { field: 'a' }, values: { a: '1' } })).toBe(null);
  expect(numeric('field', '2', { min: { field: 'a' }, values: { a: 1 } })).toBe(null);
  expect(numeric('field', 2, { min: { field: 'a' }, values: { a: 3 } })).toBe('numeric.min.field');
});
