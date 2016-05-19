import { get, isNil } from 'lodash';
import { isInt, isFloat } from 'validator';

export function numeric(field, value, options) {
  if (!value && parseInt(value, 10) !== 0) {
    return null;
  }

  const delimiter = get(options, 'delimiter');
  const number = delimiter ? value.replace(delimiter, '.') : value;

  if (!isFloat(number.toString())) {
    return 'numeric';
  }

  if (get(options, 'integerOnly') && !isInt(number.toString())) {
    return 'numeric/integerOnly';
  }

  const min = get(options, 'min');
  if (!isNil(min) && !isFloat(number.toString(), { min })) {
    return 'numeric/min';
  }

  const max = get(options, 'max');
  if (!isNil(max) && !isFloat(number.toString(), { max })) {
    return 'numeric/max';
  }

  return null;
}
