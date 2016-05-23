import { get, isNil } from 'lodash';

export function length(field, value, options) {
  if (isNil(value)) {
    return null;
  }

  let min = get(options, 'min');
  let max = get(options, 'max');

  if (get(options, 'exact')) {
    min = get(options, 'exact');
    max = get(options, 'exact');
  }

  if (!isNil(min) && value.length < min) {
    return 'length.min';
  }

  if (!isNil(max) && value.length > max) {
    return 'length.max';
  }

  return null;
}
