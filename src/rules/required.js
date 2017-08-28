// @flow
import { isArray, isEmpty, isNumber, isBoolean, get } from 'lodash';

import type { RuleOptions } from '../types';

export default function required(field: string, value: mixed, options: RuleOptions): ?string {
  const acceptFalse = get(options, 'acceptFalse', true);
  let result = false;

  if (isArray(value)) {
    result = !isEmpty(value);
  } else if (isNumber(value)) {
    result = !!String(value);
  } else if (acceptFalse && isBoolean(value)) {
    return null;
  } else {
    result = !!value;
  }

  return result ? null : 'required';
}
