import { isEmpty, isArray, isNil, get, map, filter, includes } from 'lodash';

const duplicateValuesExist = (array) => {
  return !isEmpty(filter(array, (value, index, item) => includes(item, value, index + 1)));
};

export default function uniqueInArray(field, array, options) {
  if (!isArray(array)) {
    return 'uniqueInArray';
  }

  const byUniqueObjectKey = get(options, 'byKey');
  if (!isNil(byUniqueObjectKey) && duplicateValuesExist(map(array, byUniqueObjectKey))) {
    return 'uniqueInArray.byKey';
  }

  if (duplicateValuesExist(array)) {
    return 'uniqueInArray';
  }

  return null;
}
