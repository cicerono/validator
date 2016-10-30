// @flow
import {
  constant,
  get,
  isArray,
  isBoolean,
  isFunction,
  isUndefined,
  isEmpty,
  keys,
} from 'lodash';
import { reject, flow, map, reduce } from 'lodash/fp';

import createError from './utils/createError';
import { UnknownRuleError } from './errors';
import type { ValidatorConfig, RuleSet, ValidatorErrors } from './types';

function getRuleConfig(config, field, ruleName) {
  return get(config[field], ruleName);
}

function evaluateIf(config, field, ruleName, options = {}) {
  const ruleConfig = getRuleConfig(config, field, ruleName);

  if (isUndefined(ruleConfig)) {
    return false;
  }

  let condition = get(ruleConfig, 'if');
  if (isBoolean(ruleConfig)) {
    condition = constant(ruleConfig);
  }

  if (isFunction(condition)) {
    return !!condition(get(options, 'values', {}));
  }

  return true;
}

export default function extend(rules: RuleSet) {
  function lookupRule(ruleName) {
    if (!rules.hasOwnProperty(ruleName)) {
      throw new UnknownRuleError(`Cannot find rule '${ruleName}'`);
    }

    return rules[ruleName];
  }

  function hasRulesForField(config, field) {
    return config.hasOwnProperty(field);
  }

  function validateRule(config, ruleName, field, value, options) {
    if (!options.force && !evaluateIf(config, field, ruleName, options)) {
      return null;
    }

    const rule = lookupRule(ruleName);
    const error = rule(field, value, options);

    if (error) {
      return createError(field, error, value, config[field]);
    }

    return error;
  }

  function validateField(config, field, value, values = {}) {
    let error = null;
    if (hasRulesForField(config, field)) {
      error = validateRule(config, 'required', field, value, { values, force: true });

      const fieldIsFilled = !error;

      if (error !== null && !evaluateIf(config, field, 'required', { values })) {
        error = null;
      }

      if (fieldIsFilled) {
        const fieldRules = reject('required')(keys(config[field]));
        for (let i = 0; i < fieldRules.length; i++) {
          const ruleName = fieldRules[i];
          const ruleConfig = getRuleConfig(config, field, ruleName);
          error = validateRule(config, ruleName, field, value, {
            ...ruleConfig,
            values,
          });

          if (error !== null) {
            break;
          }
        }
      }
    }

    return error;
  }

  function validate(config: ValidatorConfig, fields: Array<string>, data: Object): ValidatorErrors {
    return flow(
      map((field: string) => validateField(config, field, get(data, field), data)),
      reject(isEmpty),
      reduce((lastValue, error) => {
        if (isArray(error)) {
          let output = { ...lastValue };
          error.forEach(item => {
            output = { ...output, [item.field]: item };
          });
          return output;
        }

        return { ...lastValue, [error.field]: error };
      }, {})
    )(fields);
  }

  function validator(config: ValidatorConfig) {
    return (fields: Array<string>, data: Object) => validate(config, fields, data);
  }

  function multipleValidator(config: ValidatorConfig) {
    return function validateMultiple(fields: Array<string>, data: Object) {
      return reduce((lastValue, key) => ({
        ...lastValue,
        [key]: validate(config, fields, data[key]),
      }), {})(keys(data));
    };
  }

  return { validator, multipleValidator };
}
