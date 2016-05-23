import { keys, map, omit } from 'lodash';
import Validator from '../validator';

export function arrayOf(field, value, options) {
  const validator = new Validator(options);
  return map(value, item => validator.validate(keys(omit(options, 'values')), item));
}
