/* eslint-env jest */
/* eslint-disable global-require */
import * as rules from '../rules';

it('should export Validator', () => {
  expect(typeof require('../index').default).toBe('function');
});

it('should export Validator', () => {
  expect(typeof require('../index').validator).toBe('function');
});

it('should export extender', () => {
  expect(typeof require('../index').extend).toBe('function');
});

it('should export rules', () => {
  expect(require('../index').rules).toBe(rules);
});
