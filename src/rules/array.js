import { keys, map } from 'lodash';
import Validator from '../validator';

export function arrayOf(field, value, options) {
  const validator = new Validator(options);
  return map(value, item => {
    const result = validator.validate(keys(options), item);
    return result;
  });
}
