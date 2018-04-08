// @flow
import {get, isObject} from "lodash";

import {evaluateMin, evaluateMax} from "../utils/numbers";
import type {RuleOptions} from "../types";

const calculateMonths = (years: number = 0, months: number = 0) => years * 12 + months;

export default function duration(
  field: string,
  value: string | number,
  options?: RuleOptions,
): ?string {
  const valueInMonths = calculateMonths(
    parseInt(get(value, "years", 0), 10),
    parseInt(get(value, "months", 0), 10),
  );

  const min = get(options, "min");
  if (isObject(min)) {
    if (min.field) {
      const refField = get(options, `values.${min.field}`, {});
      if (
        evaluateMin(
          valueInMonths,
          calculateMonths(
            parseInt(get(refField, "years", 0), 10),
            parseInt(get(refField, "months", 0), 10),
          ),
        )
      ) {
        return "duration.min.field";
      }
    }
  } else if (evaluateMin(valueInMonths, min)) {
    return "duration.min";
  }

  const max = get(options, "max");
  if (isObject(max)) {
    if (max.field) {
      const refField = get(options, `values.${max.field}`, {});
      if (
        evaluateMax(
          valueInMonths,
          calculateMonths(
            parseInt(get(refField, "years", 99999), 10),
            parseInt(get(refField, "months", 99999), 10),
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
