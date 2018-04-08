// @flow
/* eslint-env jest */
import regex from "../regex";

describe("rules.regex", () => {
  it("should return null when the value match the pattern", () => {
    expect(regex("field", "2013", {pattern: /20\d+\d+/})).toBe(null);
  });

  it("should return null when the value match a string pattern", () => {
    expect(regex("field", "2013", {pattern: "20\\d+\\d+"})).toBe(null);
  });

  it('should return "regex" when the value does not match the pattern', () => {
    expect(regex("field", "20a3", {pattern: /20\d+\d+/})).toBe("regex");
  });

  it('should return "regex" when the value does not match a string pattern', () => {
    expect(regex("field", "20a3", {pattern: "20\\d+\\d+/"})).toBe("regex");
  });
});
