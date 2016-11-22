// @flow
import { isEmpty, flow, keys, map, omit, reject } from 'lodash/fp';
import type { ValidatorErrors, Validator, FieldConfig } from '../types';

export default function arrayOf(
  field: string,
  value: Array<any>,
  options: FieldConfig,
  validator: Validator,
): ?Array<ValidatorErrors> {
  const ruleOptions = omit('values')(options);
  const validate = validator(ruleOptions);
  const fields = keys(ruleOptions);
  const errors = map(item => validate(fields, item))(value);

  return flow(reject(isEmpty), isEmpty)(errors) ? null : errors;
}
