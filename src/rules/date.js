// @flow
import {get, isObject} from "lodash/fp";
import moment from "moment";

import type {RuleOptions} from "../types";

function evaluateMin(minDate, format, value) {
  return moment(minDate, format).diff(value, "days") > 0;
}

function evaluateMax(maxDate, format, value) {
  return moment(maxDate, format).diff(value, "days") < 0;
}

export default function date(field: string, value: mixed, options?: RuleOptions): ?string {
  const format = get("format")(options) || moment.ISO_8601;
  if (!moment(value, format, true).isValid()) {
    return "date.format";
  }

  const parsedValue = moment(value, format, true);

  if (get("past")(options) && parsedValue.diff(moment(), "days") >= 0) {
    return "date.past";
  }

  if (get("future")(options) && parsedValue.diff(moment(), "days") <= 0) {
    return "date.future";
  }

  const min = get("min")(options);
  if (isObject(min)) {
    if (min.field && evaluateMin(get(`values.${min.field}`)(options), format, parsedValue)) {
      return "date.min.field";
    }
  } else if (min && evaluateMin(min, format, parsedValue)) {
    return "date.min";
  }

  const max = get("max")(options);
  if (isObject(max)) {
    if (max.field && evaluateMax(get(`values.${max.field}`)(options), format, parsedValue)) {
      return "date.max.field";
    }
  } else if (max && evaluateMax(max, format, parsedValue)) {
    return "date.max";
  }

  return null;
}
