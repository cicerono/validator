export function required(field, value, options = true) {
  if (options === false) { return true }
  if (typeof value === 'string') {
    return !!value.trim()
  }
  return !!value
}
