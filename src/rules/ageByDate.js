// @flow
import { get, isNil } from 'lodash';
import moment from 'moment';

import type { RuleOptions } from '../types';

export default function ageByDate(field: string, value: mixed, options?: RuleOptions): ?string {
  let min = get(options, 'min');
  let max = get(options, 'max');

  if (get(options, 'exact')) {
    min = get(options, 'exact');
    max = get(options, 'exact');
  }

  if (!isNil(min) && Math.abs(moment(value).diff(moment(), 'years')) < min) {
    return 'ageByDate.min';
  }

  if (!isNil(max) && Math.abs(moment(value).diff(moment(), 'years')) > max) {
    return 'ageByDate.max';
  }

  return null;
}
