import test from 'ava';
import moment from 'moment';

import { ageByDate } from '../ageByDate';

test('rules.ageByDate should return null for valid values', t => {
  t.is(ageByDate('field', '2010-05-05', { min: 2 }), null);
});

test('rules.ageByDate should return "ageByDate/min" when age is below min', t => {
  t.is(ageByDate('field', moment().format('YYYY-MM-DD'), { min: 18 }), 'ageByDate/min');
});

test('rules.ageByDate should return "ageByDate/max" when age is above max', t => {
  t.is(
    ageByDate('field', moment().subtract(5, 'years').format('YYYY-MM-DD'), { max: 2 }),
    'ageByDate/max'
  );
});
