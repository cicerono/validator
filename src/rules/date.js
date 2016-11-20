// @flow
import { get } from 'lodash';
import moment from 'moment';

import type { RuleOptions } from '../types';

export default function date(field: string, value: mixed, options?: RuleOptions): ?string {
  const format = get(options, 'format', moment.ISO_8601);
  if (!moment(value, format, true).isValid()) {
    return 'date.format';
  }

  const parsedValue = moment(value, format, true);

  if (get(options, 'past') && parsedValue.diff(moment(), 'days') >= 0) {
    return 'date.past';
  }

  if (get(options, 'future') && parsedValue.diff(moment(), 'days') <= 0) {
    return 'date.future';
  }

  const minDate = get(options, 'min');
  if (minDate && moment(minDate, format).diff(parsedValue, 'days') > 0) {
    return 'date.min';
  }

  const maxDate = get(options, 'max');
  if (maxDate && moment(maxDate, format).diff(parsedValue, 'days') < 0) {
    return 'date.max';
  }

  return null;
}
