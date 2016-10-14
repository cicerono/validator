/* eslint-env jest */
/* eslint-disable global-require */
import Validator from '../validator';
import extend from '../extend';
import * as rules from '../rules';

it('should export Validator', () => {
  expect(require('../index').Validator).toBe(Validator);
});

it('should export extender', () => {
  expect(require('../index').extend).toBe(extend);
});

it('should export rules', () => {
  expect(require('../index').rules).toBe(rules);
});
