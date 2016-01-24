import assign from 'lodash.assign'

import Validator from './validator'

export default (rules) => {
  Validator.rules = assign({}, Validator.rules, rules)
  return Validator
}
