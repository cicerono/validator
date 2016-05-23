import test from 'ava';

import { arrayOf } from '../';

test('rules.arrayOf should return array of validation errors', t => {
  t.deepEqual(
    arrayOf('elements', [{}], { name: { required: true } }),
    [{ name: { rule: 'required', value: undefined, field: 'name', config: { required: true } } }]
  );
});
