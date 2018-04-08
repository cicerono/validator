// @flow
import {get, isObject} from "lodash/fp";

import {evaluateMin, evaluateMax} from "../utils/numbers";
import type {RuleOptions} from "../types";

const calculateMonths = (years: number = 0, months: number = 0) => years * 12 + months;

export default function duration(
  field: string,
  value: ?string | ?number | ?Object,
  options?: RuleOptions,
): ?string {
  const valueInMonths = calculateMonths(
    parseInt(get("years")(value), 10) || 0,
    parseInt(get("months")(value), 10) || 0,
  );

  const min = get("min")(options);
  if (isObject(min)) {
    if (min.field) {
      const refField = get(`values.${min.field}`)(options) || {};
      if (
        evaluateMin(
          valueInMonths,
          calculateMonths(
            parseInt(get("years")(refField), 10) || 0,
            parseInt(get("months")(refField), 10) || 0,
          ),
        )
      ) {
        return "duration.min.field";
      }
    }
  } else if (evaluateMin(valueInMonths, min)) {
    return "duration.min";
  }

  const max = get("max")(options);
  if (isObject(max)) {
    if (max.field) {
      const refField = get(`values.${max.field}`)(options) || {};
      if (
        evaluateMax(
          valueInMonths,
          calculateMonths(
            parseInt(get("years")(refField), 10) || 0,
            parseInt(get("months")(refField), 10) || 0,
          ),
        )
      ) {
        return "duration.max.field";
      }
    }
  } else if (evaluateMax(valueInMonths, max)) {
    return "duration.max";
  }

  return null;
}
