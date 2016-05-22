import { isArray, isEmpty, isString } from 'lodash';

export function required(field, value) {
  let result = false;

  if (isString(value)) {
    result = !!value.trim();
  } else if (isArray(value)) {
    result = !isEmpty(value);
  } else {
    result = !!value;
  }

  return result ? null : 'required';
}
