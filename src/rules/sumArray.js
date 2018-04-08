// @flow
// eslint-disable-next-line lodash-fp/use-fp
import {get, isArray, isNil, isObject, reduce} from "lodash/fp";
import {isFloat} from "validator";
import {evaluateMin, evaluateMax} from "../utils/numbers";

import type {RuleOptions} from "../types";

export default function sumArray(
  field: string,
  value: Array<mixed>,
  options: RuleOptions,
): ?string {
  if (!isArray(value)) {
    return "sumArray";
  }

  const number = reduce(
    (lastValue, item) => lastValue + parseFloat(isObject(item) ? item[options.field] : item),
    0,
  )(value);

  if (!isFloat(number.toString())) {
    return "sumArray";
  }

  const exact = get("exact")(options);
  if (!isNil(exact) && parseFloat(number) !== parseFloat(exact)) {
    return "sumArray.exact";
  }

  const min = get("min")(options);
  if (evaluateMin(number, min)) {
    return "sumArray.min";
  }

  const max = get("max")(options);
  if (evaluateMax(number, max)) {
    return "sumArray.max";
  }

  return null;
}
