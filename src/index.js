// @flow
/* eslint-disable no-var */
import _extend from './validator';
import * as _rules from './rules';
import type { Validator, RuleSet } from './types';

export const rules: RuleSet = _rules;

export function extend(rulestToAdd?: RuleSet): Validator {
  return _extend({
    ...rules,
    ...rulestToAdd,
  });
}

export const validator: Validator = extend();
export default validator;
