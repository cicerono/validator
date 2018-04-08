// @flow
import {get} from "lodash/fp";
import type {ValidatorConfig} from "../types";

export default function getRuleConfig(config: ValidatorConfig, field: string, ruleName: string) {
  return get(ruleName)(config[field]);
}
