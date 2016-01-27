import get from 'lodash.get'
import { isInt, isFloat } from 'validator'

export function numeric(field, value, options) {
  if (!value && parseInt(value, 10) !== 0) {
    return null
  }

  const delimiter = get(options, 'delimiter')
  const number = delimiter ? value.replace(delimiter, '.') : value

  if (!isFloat(number)) {
    return 'numeric'
  }

  if (!!get(options, 'integerOnly') && !isInt(number)) {
    return 'numeric/integerOnly'
  }

  const min = get(options, 'min')
  if (min && !isFloat(number, { min })) {
    return 'numeric/min'
  }

  const max = get(options, 'max')
  if (max && !isFloat(number, { max })) {
    return 'numeric/max'
  }

  return null
}
