import { get, isNil } from 'lodash';

export default function length(field, value, options) {
  let min = get(options, 'min');
  let max = get(options, 'max');

  const exact = get(options, 'exact');
  if (!isNil(exact) && value.length != exact) {
    return 'length.exact';
  }

  if (!isNil(min) && value.length < min) {
    return 'length.min';
  }

  if (!isNil(max) && value.length > max) {
    return 'length.max';
  }

  return null;
}
