export function required(field, value, options = true) {
  if (options === false) { return null; }
  let result = false;
  if (typeof value === 'string') {
    result = !!value.trim();
  } else {
    result = !!value;
  }

  return result ? null : 'required';
}
