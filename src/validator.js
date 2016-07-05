import freeze from 'deep-freeze';
import {
  assign,
  constant,
  get,
  isBoolean,
  isFunction,
  isUndefined,
  keys,
  map,
  omit,
  reduce,
  reject,
} from 'lodash';

import * as rules from './rules';
import { UnknownRuleError } from './errors';

export default class Validator {
  constructor(config) {
    if (!config) { throw new Error('Missing validator configuration'); }
    this.config = freeze(config);
    this.errors = {};
  }

  getErrors() {
    return freeze(this.errors);
  }

  validate(fields, data) {
    map(fields, field => this.validateField(field, get(data, field), data));
    return freeze(this.errors);
  }

  validateMultiple(fields, data) {
    return reduce(keys(data), (lastValue, key) => assign(
      {},
      lastValue,
      { [key]: this.validate(fields, data[key]) }
    ), {});
  }

  validateField(field, value, values = {}) {
    let error = null;
    if (this.hasRulesForField(field)) {
      error = this.validateRule('required', field, value, { values, force: true });

      const fieldIsFilled = !error;

      if (error !== null && !this.evaluateIf(field, 'required', { values })) {
        error = null;
      }

      if (fieldIsFilled) {
        const fieldRules = reject(keys(this.config[field]), 'required');
        for (let i = 0; i < fieldRules.length; i++) {
          const ruleName = fieldRules[i];
          const ruleConfig = this.getRuleConfig(field, ruleName);
          error = this.validateRule(ruleName, field, value, assign({}, ruleConfig, { values }));

          if (error !== null) {
            break;
          }
        }
      }
    }

    if (error) {
      this.errors = assign({}, this.errors, { [error.field]: error });
    } else {
      this.removeError(field);
    }

    return error;
  }

  validateRule(ruleName, field, value, options) {
    if (!options.force && !this.evaluateIf(field, ruleName, options)) {
      return null;
    }

    if (!Validator.rules.hasOwnProperty(ruleName)) {
      throw new UnknownRuleError(`Cannot find rule '${ruleName}'`);
    }

    const error = Validator.rules[ruleName](field, value, options);

    if (error) {
      return { field, rule: error, value, config: this.config[field] };
    }

    return error;
  }

  evaluateIf(field, ruleName, options = {}) {
    const ruleConfig = this.getRuleConfig(field, ruleName);

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

  hasRulesForField(field) {
    return this.config.hasOwnProperty(field);
  }

  getRuleConfig(field, ruleName) {
    return get(this.config[field], ruleName);
  }

  removeError(field) {
    if (this.errors.hasOwnProperty(field)) {
      this.errors = omit(this.errors, field);
    }
  }
}

Validator.rules = rules;
