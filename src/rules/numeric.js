import { get, isNil, isObject } from 'lodash';
import { isInt, isFloat } from 'validator';

function evaluateMin(value, min) {
  if (isNil(min) || min === '') {
    return false;
  }
  return !isFloat(value.toString(), { min: parseFloat(min) });
}

function evaluateMax(value, max) {
  if (isNil(max) || max === '') {
    return false;
  }
  return !isFloat(value.toString(), { max: parseFloat(max) });
}

function getNumberOfDecimalPlaces(number) {
  const index = number.toString().indexOf('.');
  if (index >= 0) {
    return number.toString().substring(index + 1).length;
  }
  return 0;
}

export default function numeric(field, value, options) {
  const delimiter = get(options, 'delimiter');
  const number = delimiter ? value.replace(delimiter, '.') : value;

  if (!isFloat(number.toString())) {
    return 'numeric';
  }

  const isIntegerOnly = get(options, 'integerOnly', false);

  if (isIntegerOnly && !isInt(number.toString())) {
    return 'numeric.integerOnly';
  }

  if (!isIntegerOnly) {
    const minDecimalPlaces = get(options, 'decimalPlaces.min');
    const maxDecimalPlaces = get(options, 'decimalPlaces.max');
    const decimalPlaces = getNumberOfDecimalPlaces(number);

    if (minDecimalPlaces && minDecimalPlaces > decimalPlaces) {
      return 'numeric.decimalPlaces.min';
    }

    if (maxDecimalPlaces && maxDecimalPlaces < decimalPlaces) {
      return 'numeric.decimalPlaces.max';
    }
  }


  const min = get(options, 'min');
  if (isObject(min)) {
    if (min.field && evaluateMin(number, get(options, `values.${min.field}`))) {
      return 'numeric.min.field';
    }
  } else {
    if (evaluateMin(number, min)) {
      return 'numeric.min';
    }
  }

  const max = get(options, 'max');
  if (isObject(max)) {
    if (max.field && evaluateMax(number, get(options, `values.${max.field}`))) {
      return 'numeric.max.field';
    }
  } else {
    if (evaluateMax(number, max)) {
      return 'numeric.max';
    }
  }

  return null;
}
