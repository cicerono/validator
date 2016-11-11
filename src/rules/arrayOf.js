import { keys, map, omit, isEmpty, reject } from 'lodash';
import Validator from '../validator';

const isEmptyOrAllNull = (array) => {
  return isEmpty(array) || isEmpty(reject(array, isEmpty));
};

export default function arrayOf(field, value, options) {
  const validator = new Validator(options);
  const result = map(value, item => validator.validate(keys(omit(options, 'values')), item));

  return isEmptyOrAllNull(result) ? null : result;
}
