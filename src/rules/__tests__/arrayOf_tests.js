/* eslint-env jest */
import arrayOf from '../arrayOf';

it('rules.arrayOf should return array of validation errors', () => {
  expect(arrayOf('elements', [{}], { name: { required: true } })).toEqual(
    [{ name: { rule: 'required', value: undefined, field: 'name', config: { required: true } } }]
  );
});
