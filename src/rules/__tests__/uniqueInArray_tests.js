/* eslint-env jest */
import uniqueInArray from '../uniqueInArray';

it('rules.uniqueInArray should return "uniqueInArray" for duplicate primitive values', () => {
  expect(uniqueInArray('field', [1, 0, 1])).toBe('uniqueInArray');
  expect(uniqueInArray('field', [1, 0, 1, 0, 1])).toBe('uniqueInArray');
  expect(uniqueInArray('field', ['cat', 'hat', 'fat', 'cat'])).toBe('uniqueInArray');
});

it('rules.uniqueInArray should return "null" for unique primitive values', () => {
  expect(uniqueInArray('field', [1, 0, 2])).toBe(null);
  expect(uniqueInArray('field', [1, 3, 5, 7, 11])).toBe(null);
  expect(uniqueInArray('field', ['cat', 'hat', 'fat', 'dat'])).toBe(null);
});

it('rules.uniqueInArray should return "uniqueInArray" for duplicate objects based by key', () => {
  expect(uniqueInArray(
    'field',
    [
      { productKey: '123', value: 'arbitrary' },
      { productKey: '124', value: 'arbitrary' },
      { productKey: '125', value: 'arbitrary' },
      { productKey: '123', value: 'arbitrary' },
    ],
    { byKey: 'productKey' }
  )).toBe('uniqueInArray');
});

it('rules.uniqueInArray should return "null" for unique objects based by key', () => {
  expect(uniqueInArray(
    'field',
    [
      { productKey: '123', value: 'arbitrary' },
      { productKey: '124', value: 'arbitrary' },
      { productKey: '125', value: 'arbitrary' },
      { productKey: '126', value: 'arbitrary' },
    ],
    { byKey: 'productKey' }
  )).toBe(null);
});

