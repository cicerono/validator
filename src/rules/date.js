import { get } from 'lodash';
import moment from 'moment';

export function date(field, value, options) {
  if (!moment(value, get(options, 'format'), true).isValid()) {
    return 'date.format';
  }

  if (get(options, 'past') && moment(value).diff(moment(), 'days') >= 0) {
    return 'date.past';
  }

  if (get(options, 'future') && moment(value).diff(moment(), 'days') <= 0) {
    return 'date.future';
  }

  return null;
}
