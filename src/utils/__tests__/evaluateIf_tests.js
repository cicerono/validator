// @flow
/* eslint-env jest */

import evaluateIf from '../evaluateIf';

describe('evaluateIf(config, field, ruleName, options)', () => {
  it('should return false when ruleconfig is undefined', () => {
    expect(evaluateIf({}, 'field', 'ruleName', {})).toBe(false);
  });

  it('should return result of "if" property if it is a boolean', () => {
    const config = { field: { a: { if: true }, b: { if: false } } };

    expect(evaluateIf(config, 'field', 'a', {})).toBe(true);
    expect(evaluateIf(config, 'field', 'b', {})).toBe(false);
  });

  it('should return result of "if" property if it is a function', () => {
    const config = { field: { a: { if: () => true }, b: { if: () => false } } };

    expect(evaluateIf(config, 'field', 'a', {})).toBe(true);
    expect(evaluateIf(config, 'field', 'b', {})).toBe(false);
  });

  it('should return true when ruleconfig is truthy and no "if" property', () => {
    const config = { field: { a: { } } };

    expect(evaluateIf(config, 'field', 'a', {})).toBe(true);
    expect(evaluateIf(config, 'field', 'a')).toBe(true);
  });
});
