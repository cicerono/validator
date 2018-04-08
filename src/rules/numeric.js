// @flow
import {get, isObject} from "lodash/fp";
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
  const delimiter = get("delimiter")(options);
  const number = delimiter ? String(value).replace(delimiter, ".") : value;
  const integerOnly = get("integerOnly")(options);

  if (!isFloat(number.toString())) {
    return "numeric";
  }

  if (integerOnly && !isInt(number.toString())) {
    return "numeric.integerOnly";
  }

  if (!integerOnly) {
    const minDecimalPlaces = get("decimalPlaces.min")(options);
    const maxDecimalPlaces = get("decimalPlaces.max")(options);
    const decimalPlaces = getNumberOfDecimalPlaces(number);

    if (minDecimalPlaces && minDecimalPlaces > decimalPlaces) {
      return "numeric.decimalPlaces.min";
    }

    if (maxDecimalPlaces && maxDecimalPlaces < decimalPlaces) {
      return "numeric.decimalPlaces.max";
    }
  }

  const min = get("min")(options);
  if (isObject(min)) {
    if (min.field && evaluateMin(number, get(`values.${min.field}`)(options))) {
      return "numeric.min.field";
    }
  } else if (evaluateMin(number, min)) {
    return "numeric.min";
  }

  const max = get("max")(options);
  if (isObject(max)) {
    if (max.field && evaluateMax(number, get(`values.${max.field}`)(options))) {
      return "numeric.max.field";
    }
  } else if (evaluateMax(number, max)) {
    return "numeric.max";
  }

  return null;
}
