// @flow
import {
  get,
  isBoolean,
  isFunction,
  isUndefined,
} from 'lodash/fp';

import getRuleConfig from './getRuleConfig';
import type { ValidatorConfig } from '../types';

export default function evaluateIf(
  config: ValidatorConfig,
  field: string,
  ruleName: string,
  options: Object = {}
) {
  const ruleConfig = getRuleConfig(config, field, ruleName);

  if (isUndefined(ruleConfig)) {
    return false;
  }

  const condition = get('if')(ruleConfig);

  if (isBoolean(ruleConfig)) {
    return ruleConfig;
  }

  if (isBoolean(condition)) {
    return condition;
  }

  if (isFunction(condition)) {
    return !!condition(get('values')(options) || {});
  }

  return true;
}
