import * as rules from './rules'

export default class Validator {
  constructor(config) {
    if (!config) { throw new Error('Missing validator configuration') }
    this.config = config
    this.errors = {}
  }

  getErrors() {
    return this.errors
  }

  validate(fields, data) {
    fields.map(field => this.validateField(field, data[field]))
    return this.errors
  }

  validateField(field, value) {
    let result = null
    if (this.config.hasOwnProperty(field)) {
      for (const rule in this.config[field]) {
        if (!this.validateRule(rule, field, value, this.config[field][rule])) {
          result = { field, rule, value }
          this.errors[field] = result
          break
        } else {
          if (this.errors.hasOwnProperty(field)) {
            delete this.errors[field]
          }
        }
      }
    }
    return result
  }

  validateRule(ruleName, field, value, options) {
    return rules[ruleName](field, value, options)
  }
}

Validator.rules = rules
