// @flow
import {get, isNil} from "lodash/fp";

import type {RuleOptions} from "../types";

export default function length(
  field: string,
  value: string | Array<*>,
  options?: RuleOptions,
): ?string {
  const min = get("min")(options);
  const max = get("max")(options);

  const exact = get("exact")(options);
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
