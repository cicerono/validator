import includes from 'lodash.includes'

import * as rules from './rules'

export default class Validator {
  constructor(config) {
    if (!config) { throw new Error('Missing validator configuration') }
    this.config = config
  }

  validate(fields, data, ignore) {
    return fields
      .map(field => this.validateField(field, data[field]))
      .filter(result => !!result && !includes(ignore, result.field))
      .reduce((result, value) => {
        result[value.field] = value // eslint-disable-line no-param-reassign
        return result
      }, {})
  }

  validateField(field, value) {
    if (this.config.hasOwnProperty(field)) {
      for (const rule in this.config[field]) {
        if (!this.validateRule(rule, field, value, this.config[field][rule])) {
          return { field, rule, value }
        }
      }
    }
    return null
  }

  validateRule(ruleName, field, value, options) {
    return rules[ruleName](field, value, options)
  }
}

Validator.rules = rules
