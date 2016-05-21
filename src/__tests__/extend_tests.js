import test from 'ava';
import { constant } from 'lodash';

import extend from '../extend';
const newRule = constant(null);

test('Validator.extend should extend rules suite', t => {
  const Validator = extend({ newRule });
  t.truthy(Validator.rules.newRule);
  t.is(Validator.rules.newRule, newRule);
});

test('Validator.extend should include default rules', t => {
  const Validator = extend({ newRule });
  t.truthy(Validator.rules.required);
});

test('Validator.extend should overwrite if the rule has same name', t => {
  const Validator = extend({ required: newRule });
  t.is(Validator.rules.required, newRule);
});

test('Validator.extend should create validator that is able to use the new rules', t => {
  const Validator = extend({ newRule });
  const result = new Validator({ a: { newRule: true } }).validate(['a'], {});
  t.deepEqual(result, {});
});
