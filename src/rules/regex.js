// @flow
import type {RuleOptions} from "../types";

export default function regex(field: string, value: string, options: RuleOptions): ?string {
  const pattern = new RegExp(options.pattern);

  if (!pattern.test(value)) {
    return "regex";
  }

  return null;
}
