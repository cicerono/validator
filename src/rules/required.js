// @flow
import { isArray, isEmpty, isNumber, isBoolean } from 'lodash';

export default function required(field: string, value: mixed): ?string {
  let result = false;

  if (isArray(value)) {
    result = !isEmpty(value);
  } else if (isNumber(value)) {
    result = !!String(value);
  } else if (isBoolean(value)) {
    return null;
  } else {
    result = !!value;
  }

  return result ? null : 'required';
}
