// @flow
/* eslint-disable no-var */
import _extend from "./validator";
import * as _rules from "./rules";
import type {RuleSet} from "./types";

export const rules: RuleSet = _rules;

export function extend(rulestToAdd?: RuleSet) {
  return _extend({
    ...rules,
    ...rulestToAdd,
  });
}

export const {validator, multipleValidator} = extend();
export default validator;
