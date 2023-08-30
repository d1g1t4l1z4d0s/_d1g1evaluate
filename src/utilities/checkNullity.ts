export function checkObjectNullity<T> (object: T | null): T | null {
  if (object !== null && typeof object === 'object') return Object.keys(object as Object).length > 0 ? object : null
  return null
}

export function checkArrayNullity<T> (array: T[] | null): T[] | null {
  if (array !== null && typeof array === 'object') return array.length > 0 ? array : null
  return null
}
