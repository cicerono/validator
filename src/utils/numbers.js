import { isNil } from 'lodash';
import { isFloat } from 'validator';

export function evaluateMin(value, min) {
  if (isNil(min) || min === '') {
    return false;
  }
  return !isFloat(value.toString(), { min: parseFloat(min) });
}

export function evaluateMax(value, max) {
  if (isNil(max) || max === '') {
    return false;
  }
  return !isFloat(value.toString(), { max: parseFloat(max) });
}
