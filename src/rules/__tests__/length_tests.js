// @flow
/* eslint-env jest */
import length from '../length';

it('rules.length should return null accepted values', () => {
  expect(length('field', '0', { min: 1, max: 1 })).toBe(null);
  expect(length('field', '0', { exact: 1 })).toBe(null);
});

it('rules.length should return "length.min" when value is to short', () => {
  expect(length('field', '00', { min: 3 })).toBe('length.min');
});

it('rules.length should return "length.max" when value is to long', () => {
  expect(length('field', '00', { max: 1 })).toBe('length.max');
});

it('rules.length should return "length.exact" when value is longer than exact', () => {
  expect(length('field', '00', { exact: 1 })).toBe('length.exact');
});

it('rules.length should return "length.exact" when value is shorter than exact', () => {
  expect(length('field', '00', { exact: 3 })).toBe('length.exact');
});
