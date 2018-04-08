// @flow
/* eslint-env jest */
import moment from "moment";

import date from "../date";

it("rules.date should return null for valid formats", () => {
  expect(date("field", "2015-05-05")).toBe(null);
  expect(date("field", "2016-02-29")).toBe(null);
  expect(date("field", "2015-05-05T10:00")).toBe(null);
});

it("rules.date should return null for valid formats when format is specified", () => {
  expect(date("field", "2015-05-05", {format: "YYYY-MM-DD"})).toBe(null);
  expect(date("field", "2015", {format: "YYYY"})).toBe(null);
});

it('rules.date should return "date.format" for invalid formats', () => {
  expect(date("field", "2015-r05-05")).toBe("date.format");
  expect(date("field", "2015-02-29")).toBe("date.format");
  expect(date("field", "2016-02-31")).toBe("date.format");
});

it('rules.date should return "date.format" for invalid formats when format is specified', () => {
  expect(date("field", "2015-05-05T10:00", {format: "YYYY-MM-DD"})).toBe("date.format");
});

it('rules.date should return "date.past" when date is not in past', () => {
  const inFuture = moment(new Date()).add(1, "days");
  expect(date("field", inFuture, {past: true})).toBe("date.past");
  expect(date("field", moment(), {past: true})).toBe("date.past");
});

it('rules.date should return "date.future" when date is not in future', () => {
  const inPast = moment(new Date()).subtract(1, "days");
  expect(date("field", inPast, {future: true})).toBe("date.future");
  expect(date("field", moment(), {future: true})).toBe("date.future");
});

it("rules.date should return null when value is equal", () => {
  expect(date("field", moment(), {min: moment().format("YYYY-MM-DD")})).toBe(null);
  expect(date("field", moment(), {max: moment().format("YYYY-MM-DD")})).toBe(null);
});

it('rules.date should return "date.min" when value is lower', () => {
  const inPast = moment().subtract(2, "days");
  expect(date("field", inPast, {min: moment().format("YYYY-MM-DD")})).toBe("date.min");
});

it('rules.date should return "date.max" when value is bigger', () => {
  const inFuture = moment().add(2, "days");
  expect(date("field", inFuture, {max: moment().format("YYYY-MM-DD")})).toBe("date.max");
});

it('rules.date should return "date.min.field" when value is lower than other field', () => {
  const inPast = moment().subtract(2, "days");
  const options = {
    min: {field: "otherField"},
    values: {otherField: moment().format("YYYY-MM-DD")},
  };

  expect(date("field", inPast, options)).toBe("date.min.field");
});

it('rules.date should return "date.max.field" when value is bigger than other field', () => {
  const inFuture = moment().add(2, "days");
  const options = {
    max: {field: "otherField"},
    values: {otherField: moment().format("YYYY-MM-DD")},
  };

  expect(date("field", inFuture, options)).toBe("date.max.field");
});
