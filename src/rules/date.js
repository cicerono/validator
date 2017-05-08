// @flow
import { get, isObject } from 'lodash';
import moment from 'moment';

import type { RuleOptions } from '../types';

function evaluateMin(minDate, format, value) {
  return moment(minDate, format).diff(value, 'days') > 0;
}

function evaluateMax(maxDate, format, value) {
  return moment(maxDate, format).diff(value, 'days') < 0;
}

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

  const min = get(options, 'min');
  if (isObject(min)) {
    if (min.field && evaluateMin(get(options, `values.${min.field}`), format, parsedValue)) {
      return 'date.min.field';
    }
  } else {
    if (min && evaluateMin(min, format, parsedValue)) {
      return 'date.min';
    }
  }


  const max = get(options, 'max');
  if (isObject(max)) {
    if (max.field && evaluateMax(get(options, `values.${max.field}`), format, parsedValue)) {
      return 'date.max.field';
    }
  } else {
    if (max && evaluateMax(max, format, parsedValue)) {
      return 'date.max';
    }
  }

  return null;
}
