import freeze from 'deep-freeze';
import { assign, constant, get, isBoolean, isFunction, keys, map, omit } from 'lodash';

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
    map(fields, field => this.validateField(field, data[field], data));
    return freeze(this.errors);
  }

  validateField(field, value, values = {}) {
    let result = null;
    if (this.config.hasOwnProperty(field)) {
      const fieldRules = keys(this.config[field]);
      for (let i = 0; i < fieldRules.length; i++) {
        const rule = fieldRules[i];
        const options = { values };
        if (isBoolean(this.config[field][rule])) {
          options.if = constant(this.config[field][rule]);
        }

        result = this.validateRule(
          rule,
          field,
          value,
          assign({}, this.config[field][rule], options)
        );

        if (result) {
          result = { field, rule: result, value, config: this.config[field] };
          this.errors = assign({}, this.errors, { [field]: result });
          break;
        } else {
          if (this.errors.hasOwnProperty(field)) {
            this.errors = omit(this.errors, field);
          }
        }
      }
    }
    return result;
  }

  validateRule(ruleName, field, value, options) {
    if (isFunction(get(options, 'if')) && !get(options, 'if')(get(options, 'values', {}))) {
      return null;
    }

    if (!Validator.rules.hasOwnProperty(ruleName)) {
      throw new UnknownRuleError(`Cannot find rule '${ruleName}'`);
    }

    return Validator.rules[ruleName](field, value, options);
  }
}

Validator.rules = rules;
