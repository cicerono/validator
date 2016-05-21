import test from 'ava';
import moment from 'moment';

import { date } from '../date';

test('rules.date should return null for valid formats', t => {
  t.is(date('field', '2015-05-05'), null);
  t.is(date('field', '2016-02-29'), null);
  t.is(date('field', '2015-05-05T10:00'), null);
});

test('rules.date should return null for valid formats when format is specified', t => {
  t.is(date('field', '2015-05-05', { format: 'YYYY-MM-DD' }), null);
  t.is(date('field', '2015', { format: 'YYYY' }), null);
});

test('rules.date should return "date/format" for invalid formats', t => {
  t.is(date('field', '2015-r05-05'), 'date/format');
  t.is(date('field', '2015-02-29'), 'date/format');
  t.is(date('field', '2016-02-31'), 'date/format');
});

test('rules.date should return "date/format" for invalid formats when format is specified', t => {
  t.is(date('field', '2015-05-05T10:00', { format: 'YYYY-MM-DD' }), 'date/format');
});

test('rules.date should return "date/past" when date is not in past', t => {
  const inFuture = moment(new Date()).add(1, 'days');
  t.is(date('field', inFuture, { past: true }), 'date/past');
  t.is(date('field', moment(), { past: true }), 'date/past');
});

test('rules.date should return "date/future" when date is not in future', t => {
  const inPast = moment(new Date()).subtract(1, 'days');
  t.is(date('field', inPast, { future: true }), 'date/future');
  t.is(date('field', moment(), { future: true }), 'date/future');
});
