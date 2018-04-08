// @flow
import {isNil} from "lodash/fp";
import {isFloat} from "validator";

export function evaluateMin(value: number | string, min: ?number | ?string) {
  if (isNil(min) || min === "") {
    return false;
  }
  return !isFloat(value.toString(), {min: parseFloat(min)});
}

export function evaluateMax(value: number | string, max: ?number | ?string) {
  if (isNil(max) || max === "") {
    return false;
  }
  return !isFloat(value.toString(), {max: parseFloat(max)});
}
