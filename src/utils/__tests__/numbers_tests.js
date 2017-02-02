/* eslint-env jest */
import { evaluateMin, evaluateMax } from '../numbers';

it('helpers.evaluateMin should validate min limit', () => {
  expect(evaluateMin(10, 5)).toBe(false);
  expect(evaluateMin(10, 9.9)).toBe(false);
  expect(evaluateMin(10, 10)).toBe(false);

  expect(evaluateMin(10)).toBe(false);
  expect(evaluateMin(10, null)).toBe(false);
  expect(evaluateMin(10, '')).toBe(false);

  expect(evaluateMin(9.9, 10)).toBe(true);
  expect(evaluateMin(9, 10)).toBe(true);
  expect(evaluateMin('9', 10)).toBe(true);
});

it('helpers.evaluateMax should validate max limit', () => {
  expect(evaluateMax(10, 15)).toBe(false);
  expect(evaluateMax(10, 10.1)).toBe(false);
  expect(evaluateMax(10, 10)).toBe(false);

  expect(evaluateMax(10)).toBe(false);
  expect(evaluateMax(10, null)).toBe(false);
  expect(evaluateMax(10, '')).toBe(false);

  expect(evaluateMax(10.1, 10)).toBe(true);
  expect(evaluateMax(11, 10)).toBe(true);
  expect(evaluateMax('11', 10)).toBe(true);
});
