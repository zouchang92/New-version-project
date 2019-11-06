export function isObject(option) {
  return Object.prototype.isPrototypeOf(option)
}

// 2. 是否为空对象；
export function isEmptyObject(option) {
  return Object.keys(option).length === 0
}

// 3. 是否包含 series 键；
export function hasSeriesKey(option) {
  return !!option['series']
}

// 4. series 是否为数组；
export function isSeriesArray(option) {
  return Array.isArray(option['series'])
}

// 5. series 数组是否为空。
export function isSeriesEmpty(option) {
  return option['series'].length === 0
}

export function isValidOption(option) {
  return isObject(option) && !isEmptyObject(option) && hasSeriesKey(option) && isSeriesArray(option) && !isSeriesEmpty(option)
}
