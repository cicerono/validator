/* eslint-env jest */
import required from '../required';

it('rules.required should return "required" for null value', () => {
  expect(required('field', null)).toBe('required');
});

it('rules.required should return "required" for undefined value', () => {
  expect(required('field', undefined)).toBe('required');
});

it('rules.required should return "required" for empty string', () => {
  expect(required('field', '')).toBe('required');
});

it('rules.required should return null for string with only spaces', () => {
  expect(required('field', '   ')).toBe(null);
});

it('rules.required should return "required" for empty array', () => {
  expect(required('field', [])).toBe('required');
});

it('rules.required should return null for string', () => {
  expect(required('field', 'value')).toBe(null);
});

it('rules.required should return null for number', () => {
  expect(required('field', 0)).toBe(null);
  expect(required('field', 42)).toBe(null);
});

it('rules.required should return null for non-empty-array', () => {
  expect(required('field', [42])).toBe(null);
});

it('rules.required should return null for boolean values', () => {
  expect(required('field', true)).toBe(null);
  expect(required('field', false)).toBe(null);
});
