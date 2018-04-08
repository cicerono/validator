// @flow
import {isArray, isNil, get, map} from "lodash/fp";

import type {RuleOptions} from "../types";

function duplicateValuesExist<T>(array: Array<T>): boolean {
  const seen: {[key: T]: boolean} = {};
  for (let i = 0; i < array.length; i += 1) {
    if (seen[array[i]]) {
      return true;
    }
    seen[array[i]] = true;
  }
  return false;
}

export default function uniqueInArray(
  field: string,
  array: ?Array<mixed>,
  options?: RuleOptions,
): ?string {
  if (!isArray(array)) {
    return "uniqueInArray";
  }

  const byUniqueObjectKey: ?string = get("byKey")(options);
  if (!isNil(byUniqueObjectKey)) {
    if (duplicateValuesExist(map(byUniqueObjectKey)(array))) {
      return "uniqueInArray.byKey";
    }
    // $FlowFixMe
  } else if (duplicateValuesExist(array)) {
    return "uniqueInArray";
  }

  return null;
}
