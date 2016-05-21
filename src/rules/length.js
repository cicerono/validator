import { get, isNil } from 'lodash';

export function length(field, value, options) {
  if (isNil(value)) {
    return null;
  }

  const min = get(options, 'min');
  if (!isNil(min) && value.length < min) {
    return 'length/min';
  }

  const max = get(options, 'max');
  if (!isNil(max) && value.length > max) {
    return 'length/max';
  }

  return null;
}
