// @flow
/* eslint-env jest */
import createError from "../createError";

describe("createError()", () => {
  it("should return error object for string", () => {
    const error = createError("field", "numeric", "dd", {});

    expect(error).toEqual({config: {}, field: "field", rule: "numeric", value: "dd"});
  });

  it("should return error object for array", () => {
    const error = createError(
      "array",
      [{key: {field: "key", rule: "numeric", value: "NaN", config: {}}}],
      [{key: "NaN", value: "Value"}],
      {arrayOf: {key: {numeric: {min: 0}}, value: {length: {exact: 1}}}},
    );

    expect(error).toMatchSnapshot();
  });
});
