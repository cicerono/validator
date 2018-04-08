// @flow
/* eslint-env jest */
import validator from "../index";

it("Validator should validate required rules", () => {
  const validate = validator({
    noValue: {required: true},
    present: {required: true},
    notRequired: {required: false},
    notInObject: {required: true},
  });

  const result = validate(["noValue", "present", "notRequired", "notInObject"], {
    noValue: null,
    present: "present",
    notRequired: "",
  });

  expect(result).not.toHaveProperty("notRequired");
  expect(result).not.toHaveProperty("present");

  expect(result.noValue).toEqual({
    field: "noValue",
    rule: "required",
    value: null,
    config: {required: true},
  });

  expect(result.notInObject).toEqual({
    field: "notInObject",
    rule: "required",
    value: undefined,
    config: {required: true},
  });
});
