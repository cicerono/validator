// @flow
/* eslint-env jest */
import { keys, map, reject } from 'lodash/fp';
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';

import * as rules from '../';

const readdir = Promise.promisify(fs.readdir);

it('rules module should export all rules', () => {
  return readdir(path.resolve(__dirname, '../'))
    .then(files => {
      const stripJs = file => file.replace('.js', '');
      const ruleFiles = map(stripJs)(reject(file => /__tests__|index.js/.test(file))(files));

      expect(ruleFiles).toEqual(keys(rules));
    });
});
