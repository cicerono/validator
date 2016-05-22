import test from 'ava';

import { regex } from '../regex';

test('rules.regex it should return null when the value match the pattern', t => {
  t.is(regex('field', '2013', { pattern: /20\d+\d+/ }), null);
});

test('rules.regex it should return null when the value match a string  pattern', t => {
  t.is(regex('field', '2013', { pattern: '20\\d+\\d+' }), null);
});

test('rules.regex it should return "regex" when the value does not match the pattern', t => {
  t.is(regex('field', '20a3', { pattern: /20\d+\d+/ }), 'regex');
});
