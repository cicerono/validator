import test from 'ava';
import { keys, map, reject } from 'lodash/fp';
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';

import * as rules from '../';

const readdir = Promise.promisify(fs.readdir);

test('rules module should export all rules', async t => {
  const files = await readdir(path.resolve(__dirname, '../'));
  const stripJs = file => file.replace('.js', '');
  const ruleFiles = map(stripJs)(reject(file => /__tests__|index.js/.test(file))(files));

  t.deepEqual(ruleFiles, keys(rules));
});
