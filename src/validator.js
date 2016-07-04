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
    this.config = config;
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
    if (this.config.hasOwnProperty(field)) {
      error = this.validateRule(
        'required',
        field,
        value,
        { values, required: true }
      );
      const empty = !!error;

      if (error !== null && !this.evaluateIf(field, 'required', values)) {
        error = null;
      }

      if (!empty) {
        const fieldRules = reject(keys(this.config[field]), 'required');
        for (let i = 0; i < fieldRules.length; i++) {
          const ruleName = fieldRules[i];
          error = this.validateRule(
            ruleName,
            field,
            value,
            assign({}, this.config[field][ruleName], { values })
          );

          if (error !== null) {
            break;
          }
        }
      }
    }
    return error;
  }

  validateRule(ruleName, field, value, options) {
    let condition = get(options, 'if');
    if (this.config.hasOwnProperty(field) && isBoolean(this.config[field][ruleName])) {
      condition = constant(this.config[field][ruleName]);
    }

    if (isFunction(condition) && !condition(get(options, 'values', {}))) {
      return null;
    }

    if (!Validator.rules.hasOwnProperty(ruleName)) {
      throw new UnknownRuleError(`Cannot find rule '${ruleName}'`);
    }

    let error = Validator.rules[ruleName](field, value, options);

    if (error) {
      error = { field, rule: error, value, config: this.config[field] };
      this.errors = assign({}, this.errors, { [field]: error });
    } else {
      if (this.errors.hasOwnProperty(field)) {
        this.errors = omit(this.errors, field);
      }
    }

    return error;
  }

  evaluateIf(field, ruleName, options = {}) {
    if (isUndefined(this.config[field][ruleName])) {
      return false;
    }

    let condition;
    if (this.config.hasOwnProperty(field) && isBoolean(this.config[field][ruleName])) {
      condition = constant(this.config[field][ruleName]);
    }

    if (isFunction(condition)) {
      return !!condition(get(options, 'values', {}));
    }

    return true;
  }
}

Validator.rules = rules;
