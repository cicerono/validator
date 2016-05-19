import { assign } from 'lodash';

import Validator from './validator';

export default (rules) => {
  Validator.rules = assign({}, Validator.rules, rules);
  return Validator;
};
