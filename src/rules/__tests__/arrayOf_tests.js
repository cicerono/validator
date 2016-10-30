// @flow
/* eslint-env jest */
import arrayOf from '../arrayOf';

describe('rules.arrayOf', () => {
  it('should return array of validation errors', () => {
    expect(arrayOf('elements', [{}], { name: { required: true } })).toEqual(
      [{ name: { rule: 'required', value: undefined, field: 'name', config: { required: true } } }]
    );
  });

  it('should return correct with nested arrayOf', () => {
    const options = {
      name: { length: { max: 10 } },
      nestedValues: {
        arrayOf: { key: { numeric: { min: 0 } }, value: { length: { min: 3 } } },
      },
    };

    const output = arrayOf(
      'fields',
      [{ name: 'Test 1', nestedValues: [{ key: 'NaN', value: 'Value' }] }],
      options
    );

    const expectedOutput = [{
      'nestedValues[0].key': {
        field: 'nestedValues[0].key',
        rule: 'numeric',
        value: 'NaN',
        config: { numeric: { min: 0 } },
      },
    }];

    expect(output).toEqual(expectedOutput);
  });
});
