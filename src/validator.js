import freeze from 'deep-freeze';
import { assign, keys, omit } from 'lodash';

import * as rules from './rules';

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
    fields.map(field => this.validateField(field, data[field]));
    return freeze(this.errors);
  }

  validateField(field, value) {
    let result = null;
    if (this.config.hasOwnProperty(field)) {
      const fieldRules = keys(this.config[field]);
      for (let i = 0; i < fieldRules.length; i++) {
        const rule = fieldRules[i];
        result = this.validateRule(rule, field, value, this.config[field][rule]);

        if (result) {
          result = { field, rule: result, value };
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
    return rules[ruleName](field, value, options);
  }
}

Validator.rules = rules;
