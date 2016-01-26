import get from 'lodash.get'
import { isInt, isFloat } from 'validator'

function evaluateOptions(options) {
  const validatorOptions = {}
  if (get(options, 'min')) validatorOptions.min = get(options, 'min')
  if (get(options, 'max')) validatorOptions.max = get(options, 'max')
  return validatorOptions
}

export function numeric(field, value, options) {
  if (!value) {
    return true
  }

  const validatorOptions = evaluateOptions(options)

  if (!!get(options, 'integerOnly')) {
    return isInt(value, validatorOptions)
  }

  const delimiter = get(options, 'delimiter')
  return isFloat(delimiter ? value.replace(delimiter, '.') : value, validatorOptions)
}
