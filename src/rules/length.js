// @flow
// eslint-disable-next-line lodash-fp/use-fp
import {get, isNil} from "lodash";

import type {RuleOptions} from "../types";

export default function length(
  field: string,
  value: string | Array<*>,
  options?: RuleOptions,
): ?string {
  const min = get(options, "min");
  const max = get(options, "max");

  const exact = get(options, "exact");
  if (!isNil(exact) && value.length !== exact) {
    return "length.exact";
  }

  if (!isNil(min) && value.length < min) {
    return "length.min";
  }

  if (!isNil(max) && value.length > max) {
    return "length.max";
  }

  return null;
}
