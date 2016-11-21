// @flow
import {
  get,
  isArray,
  isEmpty,
  keys,
  memoize,
} from 'lodash';
import { reject, flow, map, reduce } from 'lodash/fp';

import createError from './utils/createError';
import evaluateIf from './utils/evaluateIf';
import getRuleConfig from './utils/getRuleConfig';
import hasRulesForField from './utils/hasRulesForField';
import { UnknownRuleError } from './errors';
import type { ValidatorConfig, RuleSet, ValidatorErrors } from './types';

export default function extend(rules: RuleSet) {
  function lookupRule(ruleName) {
    if (!rules.hasOwnProperty(ruleName)) {
      throw new UnknownRuleError(`Cannot find rule '${ruleName}'`);
    }

    return rules[ruleName];
  }

  function validateRule(config, ruleName, field, value, options) {
    if (!options.force && !evaluateIf(config, field, ruleName, options)) {
      return null;
    }

    const rule = lookupRule(ruleName);
    const error = rule(field, value, options, validator);

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
    function _validate( // eslint-disable-line no-underscore-dangle
      fields: Array<string>,
      data: Object
    ) {
      return validate(config, fields, data);
    }
    _validate.memoized = memoize(_validate);
    _validate.config = config;
    return _validate;
  }

  function multipleValidator(config: ValidatorConfig) {
    function validateMultiple(fields: Array<string>, data: Object) {
      return reduce((lastValue, key) => ({
        ...lastValue,
        [key]: validate(config, fields, data[key]),
      }), {})(keys(data));
    }
    validateMultiple.memoized = memoize(validateMultiple);
    validateMultiple.config = config;
    return validateMultiple;
  }

  return { validator, multipleValidator };
}
