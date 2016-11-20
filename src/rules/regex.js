// @flow
import { isString } from 'lodash';

import type { RuleOptions } from '../types';

export default function regex(field: string, value: string, options: RuleOptions): ?string {
  const pattern = isString(options.pattern) ? new RegExp(options.pattern) : options.pattern;

  if (!pattern.test(value)) {
    return 'regex';
  }

  return null;
}
