/* eslint-env jest */
import arrayOf from '../arrayOf';

it('rules.arrayOf should return array of validation errors', () => {
  expect(arrayOf('elements', [{}], { name: { required: true } })).toEqual(
    [{ name: { rule: 'required', value: undefined, field: 'name', config: { required: true } } }]
  );
  expect(arrayOf('elements', [{ name: 'Hi' }, {}], { name: { required: true } })).toEqual(
    [
      {},
      { name: { rule: 'required', value: undefined, field: 'name', config: { required: true } } },
    ]
  );
});

it('rules.arrayOf should return null if no validation errors occur', () => {
  expect(arrayOf('elements', [], {})).toEqual(null);
  expect(arrayOf('elements', [{ name: 'Hello' }], { name: { required: true } })).toEqual(null);
  expect(arrayOf('elements', [{ name: 'Hello' }, { name: 'World' }], { name: { required: true } }))
    .toEqual(null);
});
