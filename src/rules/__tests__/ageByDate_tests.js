// @flow
/* eslint-env jest */
import moment from "moment";

import ageByDate from "../ageByDate";

it("rules.ageByDate should return null for valid values", () => {
  const two = moment()
    .subtract(2, "years")
    .format("YYYY-MM-DD");

  expect(ageByDate("field", "2010-05-05", {min: 2})).toBe(null);
  expect(ageByDate("field", two, {max: 3})).toBe(null);
  expect(ageByDate("field", two, {exact: 2})).toBe(null);
});

it('rules.ageByDate should return "ageByDate.min" when age is below min', () => {
  expect(ageByDate("field", moment().format("YYYY-MM-DD"), {min: 18})).toBe("ageByDate.min");
});

it('rules.ageByDate should return "ageByDate.max" when age is above max', () => {
  expect(
    ageByDate(
      "field",
      moment()
        .subtract(5, "years")
        .format("YYYY-MM-DD"),
      {max: 2},
    ),
  ).toBe("ageByDate.max");
});

it('rules.ageByDate should return "ageByDate.min" when age is below exact', () => {
  expect(ageByDate("field", moment().format("YYYY-MM-DD"), {exact: 18})).toBe("ageByDate.min");
});

it('rules.ageByDate should return "ageByDate.max" when age is above exact', () => {
  expect(
    ageByDate(
      "field",
      moment()
        .subtract(5, "years")
        .format("YYYY-MM-DD"),
      {exact: 2},
    ),
  ).toBe("ageByDate.max");
});
