export function addToArr(arr, v) {
  if (Array.isArray(v)) arr.push(...v)
  else arr.push(v)
}

export function createObjWithDefaultValues(self, defaults, options) {
  const res = Object.assign({}, defaults, options)
  Object.keys(defaults).forEach((k) => {
    self[k] = res[k]
  })
}

export function deleteKeyFromObj(obj, ...keys) {
  keys.forEach((k) => {
    delete obj[k]
  })
}

export function deleteObjFromArr(arr, param, id) {
  if (Array.isArray(arr)) {
    const doomedObj = arr.find((obj) => obj[param] === id)
    const doomedObjIndex = arr.indexOf(doomedObj)
    arr.splice(doomedObjIndex, 1)
  }
}

export function getArraysMutualObjects(arr1, arr2) {
  return arr1.filter(function (n) {
    // eslint-disable-next-line unicorn/prefer-includes
    return arr2.indexOf(n) !== -1
  })
}