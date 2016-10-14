/* eslint-env jest */
import { constant } from 'lodash';

import extend from '../extend';
const newRule = constant(null);

it('Validator.extend should extend rules suite', () => {
  const Validator = extend({ newRule });
  expect(Validator.rules.newRule).toBeTruthy();
  expect(Validator.rules.newRule).toBe(newRule);
});

it('Validator.extend should include default rules', () => {
  const Validator = extend({ newRule });
  expect(Validator.rules.required).toBeTruthy();
});

it('Validator.extend should overwrite if the rule has same name', () => {
  const Validator = extend({ required: newRule });
  expect(Validator.rules.required).toBe(newRule);
});

it('Validator.extend should create validator that is able to use the new rules', () => {
  const Validator = extend({ newRule });
  const result = new Validator({ a: { newRule: true } }).validate(['a'], {});
  expect(result).toEqual({});
});
