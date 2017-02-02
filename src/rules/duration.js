// @flow
import { get, isObject } from 'lodash';

import { evaluateMin, evaluateMax } from '../utils/numbers';
import type { RuleOptions } from '../types';

const calculateMonths = (years: number, months: number) => (years * 12) + months;

export default function duration(
  field: string,
  value: string | number,
  options?: RuleOptions
): ?string {
  const valueInMonths = calculateMonths(
    parseInt(get(value, 'years', 0), 10),
    parseInt(get(value, 'months', 0), 10)
  );

  const min = get(options, 'min');
  if (isObject(min)) {
    if (min.field && evaluateMin(valueInMonths, get(options, `values.${min.field}`))) {
      return 'duration.min.field';
    }
  } else {
    if (evaluateMin(valueInMonths, min)) {
      return 'duration.min';
    }
  }

  const max = get(options, 'max');
  if (isObject(max)) {
    if (max.field && evaluateMax(valueInMonths, get(options, `values.${max.field}`))) {
      return 'duration.max.field';
    }
  } else {
    if (evaluateMax(valueInMonths, max)) {
      return 'duration.max';
    }
  }

  return null;
}
