// @flow
import { get, isArray, isNil, isObject, reduce } from 'lodash';
import { isFloat } from 'validator';

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

export default function sumArray(
  field: string,
  value: Array<mixed>,
  options: RuleOptions
): ?string {
  if (!isArray(value)) {
    return 'sumArray';
  }

  const number = reduce(
    value,
    (lastValue, item) => lastValue + parseFloat(isObject(item) ? item[options.field] : item),
    0
  );

  if (!isFloat(number.toString())) {
    return 'sumArray';
  }

  const exact = get(options, 'exact');
  if (!isNil(exact) && parseFloat(number) !== parseFloat(exact)) {
    return 'sumArray.exact';
  }

  const min = get(options, 'min');
  if (evaluateMin(number, min)) {
    return 'sumArray.min';
  }

  const max = get(options, 'max');
  if (evaluateMax(number, max)) {
    return 'sumArray.max';
  }

  return null;
}
