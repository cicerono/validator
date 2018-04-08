// @flow
// eslint-disable-next-line lodash-fp/use-fp
import {get, isArray, isNil, isObject, reduce} from "lodash";
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
    value,
    (lastValue, item) => lastValue + parseFloat(isObject(item) ? item[options.field] : item),
    0,
  );

  if (!isFloat(number.toString())) {
    return "sumArray";
  }

  const exact = get(options, "exact");
  if (!isNil(exact) && parseFloat(number) !== parseFloat(exact)) {
    return "sumArray.exact";
  }

  const min = get(options, "min");
  if (evaluateMin(number, min)) {
    return "sumArray.min";
  }

  const max = get(options, "max");
  if (evaluateMax(number, max)) {
    return "sumArray.max";
  }

  return null;
}
