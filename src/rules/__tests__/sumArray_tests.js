// @flow
/* eslint-env jest */
import sumArray from "../sumArray";

it('rules.sumArray should return "sumArray.exact" for invalid exact', () => {
  expect(sumArray("field", [0, 1, 2], {exact: 4})).toBe("sumArray.exact");
  expect(sumArray("field", [{value: 0}, {value: 1}, {value: 2}], {exact: 4, field: "value"})).toBe(
    "sumArray.exact",
  );
});

it('rules.sumArray should return "sumArray.min" for invalid min', () => {
  expect(sumArray("field", [0], {min: 2, max: 4})).toBe("sumArray.min");
  expect(sumArray("field", [{value: 0}, {value: 1}], {min: 2, max: 4, field: "value"})).toBe(
    "sumArray.min",
  );
});

it('rules.sumArray should return "sumArray.max" for invalid max', () => {
  expect(sumArray("field", [0, 1, 4], {min: 2, max: 4})).toBe("sumArray.max");
  expect(
    sumArray("field", [{value: 0}, {value: 1}, {value: 4}], {min: 2, max: 4, field: "value"}),
  ).toBe("sumArray.max");
});

it("rules.sumArray should return null for unapplicable data type", () => {
  // $FlowInvalidInputTest
  expect(sumArray("field", "value", {exact: 100})).toBe("sumArray");
  // $FlowInvalidInputTest
  expect(sumArray("field", 123, {exact: 100})).toBe("sumArray");
  // $FlowInvalidInputTest
  expect(sumArray("field", {}, {exact: 100})).toBe("sumArray");
  expect(sumArray("field", [0, "a", 2], {exact: 100})).toBe("sumArray");
});

it("rules.sumArray should return null for valid exact", () => {
  expect(sumArray("field", [0, 1, 2], {exact: 3})).toBe(null);
  expect(sumArray("field", [{value: 0}, {value: 1}, {value: 2}], {exact: 3, field: "value"})).toBe(
    null,
  );
});

it("rules.sumArray should return null for valid min/max", () => {
  expect(sumArray("field", [0, 1, 2], {min: 2, max: 4})).toBe(null);
  expect(
    sumArray("field", [{value: 0}, {value: 1}, {value: 2}], {min: 2, max: 4, field: "value"}),
  ).toBe(null);
});
