// @flow
import { get, isNil, isObject } from 'lodash';
import { isInt, isFloat } from 'validator';

import type { RuleOptions } from '../types';

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

export default function numeric(
  field: string,
  value: string | number,
  options?: RuleOptions
): ?string {
  const delimiter = get(options, 'delimiter');
  const number = delimiter ? String(value).replace(delimiter, '.') : value;

  if (!isFloat(number.toString())) {
    return 'numeric';
  }

  if (get(options, 'integerOnly') && !isInt(number.toString())) {
    return 'numeric.integerOnly';
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
