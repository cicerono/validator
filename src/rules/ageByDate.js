// @flow
import {get, isNil} from "lodash/fp";
import moment from "moment";

import type {RuleOptions} from "../types";

export default function ageByDate(field: string, value: mixed, options?: RuleOptions): ?string {
  let min = get("min")(options);
  let max = get("max")(options);

  if (get("exact")(options)) {
    min = get("exact")(options);
    max = get("exact")(options);
  }

  if (!isNil(min) && Math.abs(moment(value).diff(moment(), "years")) < min) {
    return "ageByDate.min";
  }

  if (!isNil(max) && Math.abs(moment(value).diff(moment(), "years")) > max) {
    return "ageByDate.max";
  }

  return null;
}
