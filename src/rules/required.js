import { isArray, isEmpty, isString, isNumber, isBoolean } from 'lodash';

export default function required(field, value) {
  let result = false;

  if (isString(value)) {
    result = !!value.trim();
  } else if (isArray(value)) {
    result = !isEmpty(value);
  } else if (isNumber(value)) {
    result = !!value.toString();
  } else if (isBoolean(value)) {
    return null;
  } else {
    result = !!value;
  }

  return result ? null : 'required';
}
