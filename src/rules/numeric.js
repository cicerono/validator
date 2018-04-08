// @flow
// eslint-disable-next-line lodash-fp/use-fp
import {get, isObject} from "lodash";
import {isInt, isFloat} from "validator";

import {evaluateMin, evaluateMax} from "../utils/numbers";
import type {RuleOptions} from "../types";

function getNumberOfDecimalPlaces(number) {
  const index = number.toString().indexOf(".");
  if (index >= 0) {
    return number.toString().substring(index + 1).length;
  }
  return 0;
}

export default function numeric(
  field: string,
  value: string | number,
  options?: RuleOptions,
): ?string {
  const delimiter = get(options, "delimiter");
  const number = delimiter ? String(value).replace(delimiter, ".") : value;
  const integerOnly = get(options, "integerOnly");

  if (!isFloat(number.toString())) {
    return "numeric";
  }

  if (integerOnly && !isInt(number.toString())) {
    return "numeric.integerOnly";
  }

  if (!integerOnly) {
    const minDecimalPlaces = get(options, "decimalPlaces.min");
    const maxDecimalPlaces = get(options, "decimalPlaces.max");
    const decimalPlaces = getNumberOfDecimalPlaces(number);

    if (minDecimalPlaces && minDecimalPlaces > decimalPlaces) {
      return "numeric.decimalPlaces.min";
    }

    if (maxDecimalPlaces && maxDecimalPlaces < decimalPlaces) {
      return "numeric.decimalPlaces.max";
    }
  }

  const min = get(options, "min");
  if (isObject(min)) {
    if (min.field && evaluateMin(number, get(options, `values.${min.field}`))) {
      return "numeric.min.field";
    }
  } else if (evaluateMin(number, min)) {
    return "numeric.min";
  }

  const max = get(options, "max");
  if (isObject(max)) {
    if (max.field && evaluateMax(number, get(options, `values.${max.field}`))) {
      return "numeric.max.field";
    }
  } else if (evaluateMax(number, max)) {
    return "numeric.max";
  }

  return null;
}
