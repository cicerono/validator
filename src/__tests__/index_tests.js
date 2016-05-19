/* eslint-disable global-require */
import test from 'ava';

import Validator from '../validator';
import extend from '../extend';
import rules from '../rules';

test('should export Validator', t => {
  t.is(require('../index').Validator, Validator);
});

test('should export extender', t => {
  t.is(require('../index').extend, extend);
});

test('should export rules', t => {
  t.is(require('../index').rules, rules);
});
