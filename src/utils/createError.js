// @flow
/* eslint-disable lodash-fp/use-fp, lodash-fp/prefer-flat-map */
import {flatten, isArray, keys, map} from "lodash";

export default function createError(
  field: string,
  error: ?string | Array<*>,
  value: any,
  config: Object,
) {
  if (isArray(error)) {
    return flatten(
      map(error, (nestedError, i) =>
        map(keys(nestedError), key =>
          createError(
            `${field}[${i}].${key}`,
            nestedError[key].rule,
            nestedError[key].value,
            nestedError[key].config,
          ),
        ),
      ),
    );
  }

  return {field, rule: error, value, config};
}
