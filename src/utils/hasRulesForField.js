// @flow
import type {ValidatorConfig} from "../types";

export default function hasRulesForField(config: ValidatorConfig, field: string): boolean {
  return {}.hasOwnProperty.call(config, field);
}
