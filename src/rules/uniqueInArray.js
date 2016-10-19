import { isEmpty, isArray, isNil, get, map, filter, includes } from 'lodash';

const duplicateValuesExist = (array) => {
  return !isEmpty(filter(array, (value, index, item) => includes(item, value, index + 1)));
};

export default function uniqueInArray(field, array, options) {
  if (!isArray(array)) {
    return 'uniqueInArray';
  }

  let duplicatesExist = duplicateValuesExist(array);

  const byUniqueObjectKey = get(options, 'byKey');
  if (!isNil(byUniqueObjectKey)) {
    duplicatesExist = duplicateValuesExist(map(array, byUniqueObjectKey));
  }

  return duplicatesExist ? 'uniqueInArray' : null;
}
