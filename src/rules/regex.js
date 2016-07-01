import { isString } from 'lodash';

export function regex(field, value, options) {
  const pattern = isString(options.pattern) ? new RegExp(options.pattern) : options.pattern;

  if (!pattern.test(value)) {
    return 'regex';
  }

  return null;
}
